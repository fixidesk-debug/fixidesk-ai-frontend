# Create backup directory if it doesn't exist
$backupDir = Join-Path $PSScriptRoot "backup"
if (-not (Test-Path $backupDir)) {
    New-Item -ItemType Directory -Path $backupDir | Out-Null
}

# List of files to remove
$filesToRemove = @(
    # Unused components
    "src/components/analytics-dashboard.tsx",
    "src/components/temp-route-addition.tsx",
    "src/components/minimal-home.tsx",
    "src/components/contact-section.tsx",
    "src/components/features-section.tsx",
    "src/components/how-it-works-section.tsx",
    "src/components/integrations-section.tsx",
    "src/components/pricing-section.tsx",
    "src/components/testimonials-section.tsx",
    "src/components/hero-section.tsx",
    
    # Unused modals
    "src/components/modals/add-ticket-modal.tsx",
    "src/components/modals/edit-user-modal.tsx",
    "src/components/modals/invite-user-modal.tsx",
    
    # Unused settings
    "src/components/settings/ai-controls.tsx",
    "src/components/settings/ai-knowledge.tsx",
    "src/components/settings/profile-settings.tsx",
    "src/components/settings/two-factor-auth.tsx",
    
    # Potentially unused UI components
    "src/components/ui/aspect-ratio.tsx",
    "src/components/ui/carousel.tsx",
    "src/components/ui/drawer.tsx",
    "src/components/ui/tabs.tsx",
    "src/components/ui/toggle-group.tsx",
    
    # Utility files
    "src/components/Seo.tsx",
    "src/components/auth-guard.tsx"
)

# Backup and remove files
foreach ($file in $filesToRemove) {
    $filePath = Join-Path $PSScriptRoot $file
    $backupPath = Join-Path $backupDir (Split-Path $file -Leaf)
    
    if (Test-Path $filePath) {
        # Backup the file
        Copy-Item -Path $filePath -Destination $backupPath -Force
        
        # Remove the original file
        Remove-Item -Path $filePath -Force
        Write-Host "Removed: $file"
    } else {
        Write-Host "Not found: $file"
    }
}

# Remove empty directories
Get-ChildItem -Path (Join-Path $PSScriptRoot "src") -Recurse -Directory | 
    Where-Object { $_.GetFiles().Count -eq 0 -and $_.GetDirectories().Count -eq 0 } | 
    Remove-Item -Recurse -Force

Write-Host "Cleanup completed. Files backed up to: $backupDir"
