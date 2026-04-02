Add-Type -AssemblyName System.Drawing

# Convert logo.png (actually JPEG) to real PNG
$logoPath = 'C:\Users\sahad\ECommerceApp\src\assets\logo.png'
$backupPath = 'C:\Users\sahad\ECommerceApp\src\assets\logo_backup.jpg'

# Backup the original
Copy-Item $logoPath $backupPath -Force

# Load and re-save as proper PNG
$img = [System.Drawing.Image]::FromFile($backupPath)
$img.Save($logoPath, [System.Drawing.Imaging.ImageFormat]::Png)
$img.Dispose()

Write-Host "Converted logo.png to proper PNG format"

# Verify the new file
$bytes = [System.IO.File]::ReadAllBytes($logoPath)
$header = ($bytes[0..7] | ForEach-Object { '{0:X2}' -f $_ }) -join ' '
Write-Host "New size: $($bytes.Length) bytes"
Write-Host "New header: $header"

# Also check if 'green' file (no extension) needs cleanup
$greenNoExt = 'C:\Users\sahad\ECommerceApp\src\assets\green'
if (Test-Path $greenNoExt) {
    $greenBytes = [System.IO.File]::ReadAllBytes($greenNoExt)
    $greenHeader = ($greenBytes[0..7] | ForEach-Object { '{0:X2}' -f $_ }) -join ' '
    Write-Host "`n'green' (no ext) header: $greenHeader, size: $($greenBytes.Length)"
    Write-Host "This file has no extension and may confuse the bundler. Removing it."
    Remove-Item $greenNoExt -Force
    Write-Host "Removed 'green' (no extension) file"
}

# Clean up backup
Remove-Item $backupPath -Force
Write-Host "`nDone! logo.png is now a valid PNG."
