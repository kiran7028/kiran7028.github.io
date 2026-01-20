# Skills Module

This folder contains all skill-related data and configuration for the portfolio website.

## 📁 Structure

```
skills/
├── skills-config.json      # Main configuration file
├── skills-loader.js        # Dynamic loader module
├── aws-skills.json         # AWS services
├── devops-skills.json      # DevOps tools
├── programming-skills.json # Programming languages
└── README.md              # This file
```

## 🎯 How to Edit Skills

### Adding/Removing Skills

Edit the respective JSON files:

**AWS Skills** (`aws-skills.json`):
```json
[
  {
    "name": "EC2 (Elastic Compute Cloud)"
  },
  {
    "name": "Your New AWS Service"
  }
]
```

**DevOps Skills** (`devops-skills.json`):
```json
[
  {
    "name": "Docker & Containerization"
  },
  {
    "name": "Your New DevOps Tool"
  }
]
```

**Programming Skills** (`programming-skills.json`):
```json
[
  {
    "name": "Python"
  },
  {
    "name": "Your New Language"
  }
]
```

### Adding a New Skill Category

1. **Create a new JSON file** (e.g., `cloud-skills.json`):
```json
[
  {
    "name": "Google Cloud Platform"
  },
  {
    "name": "Microsoft Azure"
  }
]
```

2. **Update `skills-config.json`**:
```json
{
  "categories": [
    {
      "id": "cloud",
      "title": "Cloud Platforms",
      "icon": "assets/cloud-icon.png",
      "iconAlt": "Cloud",
      "dataFile": "skills/cloud-skills.json"
    }
  ]
}
```

3. **Add the icon** to the `assets/` folder

## 🔧 Technical Details

- **Dynamic Loading**: Skills are loaded asynchronously using the Fetch API
- **Modular Design**: Each category is in a separate JSON file for easy maintenance
- **Error Handling**: Graceful fallback if files fail to load
- **Performance**: Skills are loaded in parallel for faster rendering

## 📝 JSON Format

Each skill item follows this format:
```json
{
  "name": "Skill Name or Description"
}
```

Future enhancements could include:
- `"level": "Expert"` - Skill proficiency level
- `"years": 5` - Years of experience
- `"url": "https://..."` - Link to certification or project

## 🚀 Usage

The skills are automatically loaded when the page loads. No manual intervention needed.

To reload skills programmatically:
```javascript
const loader = new SkillsLoader('skills-container');
loader.init();
```
