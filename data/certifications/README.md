# Certifications Module

This directory contains the modular certifications feature for the portfolio website.

## Structure

```
certifications/
├── certifications-config.json       # Main configuration file
├── certifications-loader.js         # JavaScript loader module
├── aws-certifications.json          # AWS certifications data
├── devops-certifications.json       # DevOps certifications data
└── kubernetes-certifications.json   # Kubernetes certifications data
```

## How It Works

1. **Config File** (`certifications-config.json`): Defines certification categories with icons and data file paths
2. **Loader Script** (`certifications-loader.js`): Dynamically loads and renders certifications
3. **Data Files**: Individual JSON files for each certification category

## Adding New Certifications

### Add to Existing Category

Edit the appropriate JSON file (e.g., `aws-certifications.json`):

```json
{
    "name": "AWS Certified Security - Specialty",
    "issuer": "Amazon Web Services",
    "date": "2025",
    "credentialId": "SCS-C02",
    "verifyUrl": "https://aws.amazon.com/verification"
}
```

### Add New Category

1. Create a new JSON file (e.g., `cloud-certifications.json`)
2. Add the category to `certifications-config.json`:

```json
{
    "id": "cloud",
    "title": "Cloud Certifications",
    "icon": "assets/cloud.png",
    "iconAlt": "Cloud",
    "dataFile": "certifications/cloud-certifications.json"
}
```

## Certification Object Schema

```json
{
    "name": "Certification Name",           // Required
    "issuer": "Issuing Organization",       // Required
    "date": "YYYY or Month YYYY",          // Required
    "credentialId": "Credential ID",        // Optional
    "verifyUrl": "Verification URL"         // Optional
}
```

## Features

- ✅ Modular structure (like Skills)
- ✅ Category-based organization
- ✅ Icon support for each category
- ✅ Detailed certification information
- ✅ Optional verification links
- ✅ Easy to edit via JSON files
- ✅ No HTML knowledge required

## Styling

The certifications use similar styling to the skills panels. You can customize the appearance in `style.css` using these classes:

- `.certifications-grid` - Grid container
- `.cert-panel` - Individual category panel
- `.cert-panel-header` - Panel header with icon
- `.cert-icon` - Category icon
- `.cert-list` - List of certifications
- `.cert-item` - Individual certification
- `.cert-issuer` - Issuer name
- `.cert-date` - Certification date
- `.cert-id` - Credential ID
- `.cert-verify` - Verification link
