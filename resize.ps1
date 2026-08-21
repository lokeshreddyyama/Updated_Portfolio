Add-Type -AssemblyName System.Drawing

function Resize-ImageJpeg($path, $width, $outPath) {
    $img = [System.Drawing.Image]::FromFile($path)
    $ratio = $width / $img.Width
    $height = [math]::Round($img.Height * $ratio)
    $newImage = New-Object System.Drawing.Bitmap($width, $height)
    $g = [System.Drawing.Graphics]::FromImage($newImage)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.DrawImage($img, 0, 0, $width, $height)
    
    $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageDecoders() | Where-Object { $_.FormatID -eq [System.Drawing.Imaging.ImageFormat]::Jpeg.Guid }
    $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]85)
    
    $newImage.Save($outPath, $codec, $encoderParams)
    
    $g.Dispose()
    $newImage.Dispose()
    $img.Dispose()
}

function Resize-ImagePng($path, $width, $outPath) {
    $img = [System.Drawing.Image]::FromFile($path)
    $ratio = $width / $img.Width
    $height = [math]::Round($img.Height * $ratio)
    $newImage = New-Object System.Drawing.Bitmap($width, $height)
    $g = [System.Drawing.Graphics]::FromImage($newImage)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.DrawImage($img, 0, 0, $width, $height)
    
    $newImage.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    
    $g.Dispose()
    $newImage.Dispose()
    $img.Dispose()
}

Write-Host "Resizing coffee.jpg..."
Resize-ImageJpeg "$PSScriptRoot\images\coffee.jpg" 800 "$PSScriptRoot\images\coffee_optimized.jpg"
Write-Host "Resizing digital.jpg..."
Resize-ImageJpeg "$PSScriptRoot\images\digital.jpg" 800 "$PSScriptRoot\images\digital_optimized.jpg"
Write-Host "Resizing professional_photo.png..."
Resize-ImagePng "$PSScriptRoot\images\professional_photo.png" 600 "$PSScriptRoot\images\professional_photo_optimized.png"
Write-Host "Done!"
