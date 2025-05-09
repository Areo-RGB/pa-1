import os
import fnmatch
from pathlib import Path
import re
from datetime import datetime # IMPORT DATETIME

# --- Configuration ---

# --- Define the BASE output directory and filename prefix ---
output_base_dir_str = r"C:\Users\Anwender\Desktop\Steuern\regeln"
output_filename_prefix = "context"

# --- Generate timestamp ---
timestamp = datetime.now().strftime("%Y%m%d_%H%M%S") # Format: YYYYMMDD_HHMMSS

# --- Construct the full output path with timestamp ---
output_filename_with_timestamp = f"{output_filename_prefix}_{timestamp}.md"
output_file_path = Path(output_base_dir_str) / output_filename_with_timestamp
output_file_path = output_file_path.resolve() # Ensure it's an absolute path


# Directory to scan for INPUT files (relative to where the script is run)
# '.' means scan the directory containing this script
ROOT_DIR = '.'

# --- Include/Exclude/Language Mappings ---
# Adjust these lists based on your specific project needs for AI context
# Be selective to manage token count and relevance.
INCLUDE_PATTERNS = [
    # Code files
    "*.py", "*.js", "*.jsx", "*.ts", "*.tsx", "*.jtsx", # Added .jtsx
    "*.mjs", "*.cjs", "*.vue", "*.svelte",
    "*.java", "*.cs", "*.go", "*.rs", "*.rb", "*.php",
    "*.html", "*.htm", "*.css", "*.scss", "*.sass", "*.less",
    "*.sql",

    # Config & Data files
    "*.json", "*.yaml", "*.yml", "*.xml", "*.toml", "*.ini",
    ".env*", # Includes .env, .env.local, .env.production etc.
    "requirements.txt", "package.json", "pyproject.toml", "pom.xml",
    "next.config.*", "postcss.config.*", "tailwind.config.*", "tsconfig.*",
    "vite.config.*", "webpack.config.*", "babel.config.*", ".eslintrc.*", ".prettierrc.*",
    ".dockerignore", ".gitignore", ".gitattributes",

    # Infrastructure & Build files
    "Dockerfile", "docker-compose.yml", "docker-compose.yaml",
    "Makefile", "makefile", ".gitlab-ci.yml", ".travis.yml", "azure-pipelines.yml",
    ".tf", ".hcl", "*.gradle", "*.kts", "*.groovy",

    # Documentation
    "README.md", "CONTRIBUTING.md", "LICENSE", "CHANGELOG.md",

    # Specific important files (examples, adjust as needed)
    # "src/main.py", "src/index.js", "config/settings.py", "lib/utils.js"
]
# Directories to exclude entirely
EXCLUDE_DIRS = [
    # Common excludes
    '.git', '.vscode', 'node_modules', '__pycache__', 'dist', 'build',
    'venv', '.venv', 'env', '.env', # Exclude virtual environments
    'target', # Common Java/Rust build output
    'coverage', 'logs', '*.log', 'tmp', 'temp',

    # Project specific (examples, adjust as needed)
    'public',   # Often contains static assets, exclude if large/irrelevant
    '.next',    # Next.js build output
    'storybook-static', # Storybook build output
    'vendor',   # Dependency folders (like PHP composer vendor)
    'assets',   # If it contains large media files
    'docs/build', # Built documentation sites
    'test/fixtures', # If large test data files exist
]
# Specific files to exclude (even if they match include patterns)
# Use paths relative to ROOT_DIR
EXCLUDE_FILES = [
    # Lock files are often very long and less useful for general context
    "*.lock",
    "package-lock.json",
    "pnpm-lock.yaml",
    "yarn.lock",
    "composer.lock",
    "Pipfile.lock",
    "poetry.lock",

    # Other potential excludes (examples)
    # "data/large_dataset.csv",
    # "config/secrets.yml",
]

# Map file extensions to Markdown language identifiers
# Expanded for common web development scenarios
LANG_MAP = {
    # Frontend Core
    ".html": "html", ".htm": "html", ".css": "css", ".js": "javascript",
    ".mjs": "javascript", ".cjs": "javascript",

    # Frontend Frameworks/Libraries
    ".jsx": "jsx", ".ts": "typescript", ".tsx": "tsx", ".jtsx": "tsx", # Added .jtsx
    ".vue": "vue", ".svelte": "svelte",

    # CSS Preprocessors
    ".scss": "scss", ".sass": "sass", ".less": "less",

    # Backend Languages
    ".py": "python", ".php": "php", ".rb": "ruby", ".go": "go",
    ".java": "java", ".cs": "csharp", ".rs": "rust",

    # Templating Engines
    ".erb": "erb", ".j2": "jinja", ".ejs": "ejs", ".hbs": "handlebars",
    ".pug": "pug", ".cshtml": "cshtml",

    # Data & Configuration
    ".json": "json", ".yaml": "yaml", ".yml": "yaml", ".xml": "xml",
    ".toml": "toml", ".ini": "ini", ".env": "dotenv", ".cfg": "ini",
    ".conf": "nginx", # Adjust if specific (e.g., apache, ini)

    # Infrastructure & Shell
    ".sh": "bash", ".bash": "bash", ".zsh": "zsh",
    "dockerfile": "dockerfile", # Use lowercase key for consistency
    "makefile": "makefile",     # Use lowercase key for consistency
    ".tf": "terraform", ".hcl": "hcl",

    # Databases
    ".sql": "sql",

    # Markup & Documentation
    ".md": "markdown", ".rst": "rst", ".txt": "", # Plain text

    # Other common build/tooling files
    ".gradle": "groovy", ".kts": "kotlin", ".groovy": "groovy",
    ".gitignore": "gitignore", ".dockerignore": "dockerignore",
    ".gitattributes": "gitattributes",
    ".editorconfig": "ini", # EditorConfig often resembles INI
    ".prettierrc": "json",  # Often JSON, could be YAML
    ".eslintrc": "json",    # Often JSON, could be YAML

    # Fallback for unknown types
    "": "", # Default for files with no extension
}
# --- End Configuration ---


# --- Helper Functions ---

def generate_markdown_anchor(text):
    """Generates a Markdown-compatible anchor link from text."""
    text = text.lower()
    text = re.sub(r'[^\w\s-]', '', text) # Keep word chars, whitespace, hyphens
    text = re.sub(r'\s+', '-', text)    # Replace whitespace with single hyphen
    text = text.strip('-')
    # Ensure anchor is not empty and add prefix
    return "file-" + (text if text else "untitled")

def get_language_id(file_path: Path) -> str:
    """Gets the Markdown language identifier for a file path."""
    # Check for exact filename matches first (e.g., Dockerfile)
    if file_path.name.lower() in LANG_MAP:
        return LANG_MAP[file_path.name.lower()]
    # Check by extension
    ext = file_path.suffix.lower()
    return LANG_MAP.get(ext, "") # Return "" if extension not found

def should_exclude(file_path_abs: Path, root_abs: Path, exclude_dirs_set_abs: set, exclude_files_set_abs: set, include_patterns: list, output_path_abs: Path) -> bool:
    """Checks if a file should be excluded based on configuration. Uses absolute paths."""
    # 1. Check if it IS the output file itself
    if file_path_abs == output_path_abs: # This check remains important, even though the name changes each run
        return True

    # 2. Check against excluded directories (absolute paths)
    if any(file_path_abs.is_relative_to(excluded_dir) for excluded_dir in exclude_dirs_set_abs):
        return True

    # 3. Check against excluded files (absolute paths)
    if file_path_abs in exclude_files_set_abs:
        return True

    # 4. Check if the file matches any include pattern (if patterns are defined)
    matches_include = any(fnmatch.fnmatch(file_path_abs.name, pattern) for pattern in include_patterns)
    if not matches_include:
        return True

    return False


# --- Path Setup ---
root_path = Path(ROOT_DIR).resolve() # Absolute path of the directory to scan

# Ensure the output directory exists
try:
    output_file_path.parent.mkdir(parents=True, exist_ok=True)
    print(f"Ensured output directory exists: {output_file_path.parent}")
except Exception as e:
    print(f"ERROR: Could not create output directory {output_file_path.parent}: {e}")
    exit(1)

# Exclusion setup (resolve paths to absolute for reliable comparison)
exclude_dir_paths_abs = []
for d in EXCLUDE_DIRS:
    try:
        for matched_dir in root_path.glob(d):
             if matched_dir.is_dir():
                 exclude_dir_paths_abs.append(matched_dir.resolve())
        literal_dir = root_path / d
        if literal_dir.is_dir(): # Add literal path too
            exclude_dir_paths_abs.append(literal_dir.resolve())
    except Exception as e:
        print(f"Warning: Could not resolve exclude dir pattern '{d}': {e}")

exclude_file_paths_abs = []
for f in EXCLUDE_FILES:
    try:
        for matched_file in root_path.glob(f):
            if matched_file.is_file():
                exclude_file_paths_abs.append(matched_file.resolve())
        literal_file = root_path / f
        if literal_file.is_file(): # Add literal path too
             exclude_file_paths_abs.append(literal_file.resolve())
    except Exception as e:
        print(f"Warning: Could not resolve exclude file pattern '{f}': {e}")


exclude_dir_paths_set_abs = set(exclude_dir_paths_abs)
exclude_file_paths_set_abs = set(exclude_file_paths_abs)

print(f"\n--- Configuration Summary ---")
print(f"Scanning for input files in: {root_path}")
print(f"Output will be written to: {output_file_path}") # This will now show the timestamped name
print(f"Include patterns: {len(INCLUDE_PATTERNS)}")
print(f"Excluding directories ({len(exclude_dir_paths_set_abs)}):")
for p in sorted(list(exclude_dir_paths_set_abs)): print(f"  - {p}")
print(f"Excluding specific files ({len(exclude_file_paths_set_abs)}):")
for p in sorted(list(exclude_file_paths_set_abs)): print(f"  - {p}")
print(f"-----------------------------\n")


# --- File Discovery ---
files_to_include = []
print("Scanning files...")
processed_paths = set()

for item in root_path.rglob('*'):
    if item.resolve() in processed_paths: continue
    processed_paths.add(item.resolve())
    if not item.is_file(): continue
    item_abs = item.resolve()
    if not should_exclude(item_abs, root_path, exclude_dir_paths_set_abs, exclude_file_paths_set_abs, INCLUDE_PATTERNS, output_file_path):
         files_to_include.append(item_abs)

files_to_include.sort()
print(f"\nFound {len(files_to_include)} files to include.")

# --- File Writing ---
try:
    with open(output_file_path, 'w', encoding='utf-8') as outfile:
        outfile.write(f"# AI Context Bundle\n\n")
        outfile.write(f"## Project Root Scanned: `{root_path.name}`\n\n")
        outfile.write(f"Generated on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n") # Optional: Add generation time to content


        if files_to_include:
            outfile.write(f"## Table of Contents ({len(files_to_include)} files)\n\n")
            toc_entries = []
            for file_path_abs in files_to_include:
                try:
                    relative_path = file_path_abs.relative_to(root_path)
                except ValueError:
                    relative_path = file_path_abs
                relative_path_str = relative_path.as_posix()
                header_text = f"File: {relative_path_str}"
                anchor_target = generate_markdown_anchor(header_text)
                toc_entries.append(f"- [{relative_path_str}](#{anchor_target})")
            outfile.write("\n".join(toc_entries))
            outfile.write("\n\n---\n\n")
        else:
            outfile.write("No files selected for inclusion based on current configuration.\n")
            print("\nNo files matched the criteria. Output file contains only headers.")
            exit(0)


        print(f"Writing {len(files_to_include)} files to {output_file_path}...")
        file_counter = 0
        for file_path_abs in files_to_include:
            file_counter += 1
            try:
                relative_path = file_path_abs.relative_to(root_path)
            except ValueError:
                relative_path = file_path_abs
            relative_path_str = relative_path.as_posix()
            print(f"  ({file_counter}/{len(files_to_include)}) Adding: {relative_path_str}")

            header_text = f"File: {relative_path_str}"
            outfile.write(f"## {header_text}\n\n")

            lang_id = get_language_id(file_path_abs)

            try:
                content = file_path_abs.read_text(encoding='utf-8', errors='ignore')
                lines = content.splitlines()
                num_lines = len(lines)

                outfile.write(f"``` {lang_id}\n")

                if num_lines > 0:
                    max_digits = len(str(num_lines)) if num_lines > 0 else 1
                    numbered_lines = [f"{i:{max_digits}}: {line}" for i, line in enumerate(lines, 1)]
                    outfile.write("\n".join(numbered_lines))
                    if content and not content.endswith(('\n', '\r')):
                         outfile.write("\n")
                    elif not numbered_lines:
                         outfile.write("\n")
                else:
                     outfile.write("\n")

                outfile.write("```\n\n")

            except Exception as e:
                print(f"    ERROR reading or processing {relative_path_str}: {e}")
                outfile.write(f"``` error\n")
                outfile.write(f"*** Error reading/processing file ({type(e).__name__}): {e} ***\n")
                outfile.write("```\n\n")

    print(f"\nSuccessfully combined {len(files_to_include)} files with line numbers and navigation into {output_file_path}")

except Exception as e:
    print(f"\nFATAL ERROR during file writing to {output_file_path}: {e}")
    exit(1)