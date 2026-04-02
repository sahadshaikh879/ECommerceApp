$bytes = [System.IO.File]::ReadAllBytes('C:\Users\sahad\ECommerceApp\src\assets\logo.png')
Write-Host "Size: $($bytes.Length) bytes"
$header = ($bytes[0..7] | ForEach-Object { '{0:X2}' -f $_ }) -join ' '
Write-Host "Header (hex): $header"
# Valid PNG header: 89 50 4E 47 0D 0A 1A 0A
if ($header -eq '89 50 4E 47 0D 0A 1A 0A') {
    Write-Host "Valid PNG header"
} else {
    Write-Host "INVALID PNG header!"
}
