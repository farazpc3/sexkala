# scripts/copy-images-simple.ps1
# Run this from D:\farazprojects\sexkala

$sourceDir = "public\product-images"
$destDir = "public\products"

Write-Host "========================================"
Write-Host "Copying all product images (no conversion)"
Write-Host "========================================"

# Create all product directories first
$productIds = @(
    "0001","0002","0003","0004","0005","0006","0007","0008","0009",
    "0010","0011","0012","0013","0014","0015","0016","0017","0018",
    "0019","0020","0021","0022","0023","0024","0025","0026","0027",
    "0028","0029","0030","0031","0032","0033"
)

foreach ($id in $productIds) {
    $dir = Join-Path $destDir $id
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Force -Path $dir | Out-Null
    }
}

# Define the mapping - using 1-1.jpg format for first products
$imageMap = @{
    # Product 0001
    "1-1.jpg" = "0001\cover.webp"
    "1-2.jpg" = "0001\photo_1.webp"
    "1-3.jpg" = "0001\photo_2.webp"
    "1-4.jpg" = "0001\photo_3.webp"
    "1-5.jpg" = "0001\photo_4.webp"
    "1-6.jpg" = "0001\photo_5.webp"
    
    # Product 0002
    "2-1.jpg" = "0002\cover.webp"
    "2-2.jpg" = "0002\photo_1.webp"
    "2-3.jpg" = "0002\photo_2.webp"
    "2-4.jpg" = "0002\photo_3.webp"
    "2-5.jpg" = "0002\photo_4.webp"
    "2-6.jpg" = "0002\photo_5.webp"
    "2-7.jpg" = "0002\photo_6.webp"
    "2-8.jpg" = "0002\photo_7.webp"
    "2-9.jpg" = "0002\photo_8.webp"
    "2-10.jpg" = "0002\photo_9.webp"
    
    # Product 0003
    "3-1.jpg" = "0003\cover.webp"
    "3-2.jpg" = "0003\photo_1.webp"
    "3-3.jpg" = "0003\photo_2.webp"
    "3-4.jpg" = "0003\photo_3.webp"
    
    # Product 0004
    "4-1.jpg" = "0004\cover.webp"
    "4-2.jpg" = "0004\photo_1.webp"
    "4-3.jpg" = "0004\photo_2.webp"
    "4-4.jpg" = "0004\photo_3.webp"
    "4-5.jpg" = "0004\photo_4.webp"
    
    # Product 0006
    "6-1.jpg" = "0006\cover.webp"
    "6-2.jpg" = "0006\photo_1.webp"
    "6-3.jpg" = "0006\photo_2.webp"
    "6-4.jpg" = "0006\photo_3.webp"
    "6-5.jpg" = "0006\photo_4.webp"
    "6-6.jpg" = "0006\photo_5.webp"
    "6-7.jpg" = "0006\photo_6.webp"
    
    # Product 0007
    "7-1.jpg" = "0007\cover.webp"
    "7-2.jpg" = "0007\photo_1.webp"
    "7-3.jpg" = "0007\photo_2.webp"
    "7-4.jpg" = "0007\photo_3.webp"
    "7-5.jpg" = "0007\photo_4.webp"
    "7-6.jpg" = "0007\photo_5.webp"
    "7-7.jpg" = "0007\photo_6.webp"
    "7-8.jpg" = "0007\photo_7.webp"
    
    # Product 0008
    "8-1.jpg" = "0008\cover.webp"
    "8-2.jpg" = "0008\photo_1.webp"
    "8-3.jpg" = "0008\photo_2.webp"
    "8-4.jpg" = "0008\photo_3.webp"
    "8-5.jpg" = "0008\photo_4.webp"
    "8-6.jpg" = "0008\photo_5.webp"
    "8-7.jpg" = "0008\photo_6.webp"
    "8-8.jpg" = "0008\photo_7.webp"
    
    # Product 0009
    "9-1.jpg" = "0009\cover.webp"
    "9-2.jpg" = "0009\photo_1.webp"
    "9-3.jpg" = "0009\photo_2.webp"
    
    # Product 0010
    "10-1.jpg" = "0010\cover.webp"
    "10-2.jpg" = "0010\photo_1.webp"
    
    # Product 0011
    "11-1.jpg" = "0011\cover.webp"
    "11-2.jpg" = "0011\photo_1.webp"
    "11-3.jpg" = "0011\photo_2.webp"
    "11-4.jpg" = "0011\photo_3.webp"
    "11-5.jpg" = "0011\photo_4.webp"
    "11-6.jpg" = "0011\photo_5.webp"
    
    # Product 0012
    "12-1.jpg" = "0012\cover.webp"
    "12-2.jpg" = "0012\photo_1.webp"
    "12-3.jpg" = "0012\photo_2.webp"
    "12-4.jpg" = "0012\photo_3.webp"
    "12-5.jpg" = "0012\photo_4.webp"
    "12-6.jpg" = "0012\photo_5.webp"
    
    # Product 0013
    "13-1.jpg" = "0013\cover.webp"
    "13-2.jpg" = "0013\photo_1.webp"
    "13-3.jpg" = "0013\photo_2.webp"
    "13-4.jpg" = "0013\photo_3.webp"
    "13-5.jpg" = "0013\photo_4.webp"
    
    # Product 0014
    "14-1.jpg" = "0014\cover.webp"
    "14-2.jpg" = "0014\photo_1.webp"
    "14-3.jpg" = "0014\photo_2.webp"
    "14-4.jpg" = "0014\photo_3.webp"
    
    # Product 0015
    "15-1.jpg" = "0015\cover.webp"
    
    # Product 0016
    "16-1.jpg" = "0016\cover.webp"
    "16-2.jpg" = "0016\photo_1.webp"
    "16-3.jpg" = "0016\photo_2.webp"
    "16-4.jpg" = "0016\photo_3.webp"
    "16-5.jpg" = "0016\photo_4.webp"
    
    # Product 0017
    "17-1.jpg" = "0017\cover.webp"
    "17-2.jpg" = "0017\photo_1.webp"
    "17-3.jpg" = "0017\photo_2.webp"
    "17-4.jpg" = "0017\photo_3.webp"
    "17-5.jpg" = "0017\photo_4.webp"
    "17-6.jpg" = "0017\photo_5.webp"
    "17-7.jpg" = "0017\photo_6.webp"
    
    # Product 0018
    "photo_103@20-07-2026_21-45-53.jpg" = "0018\cover.webp"
    "photo_104@20-07-2026_21-45-53.jpg" = "0018\photo_1.webp"
    "photo_105@20-07-2026_21-45-53.jpg" = "0018\photo_2.webp"
    "photo_106@20-07-2026_21-45-53.jpg" = "0018\photo_3.webp"
    "photo_107@20-07-2026_21-45-54.jpg" = "0018\photo_4.webp"
    
    # Product 0019
    "photo_108@20-07-2026_21-46-01.jpg" = "0019\cover.webp"
    "photo_109@20-07-2026_21-46-01.jpg" = "0019\photo_1.webp"
    "photo_110@20-07-2026_21-46-01.jpg" = "0019\photo_2.webp"
    
    # Product 0020
    "photo_111@22-07-2026_09-40-19.jpg" = "0020\cover.webp"
    "photo_112@22-07-2026_09-40-19.jpg" = "0020\photo_1.webp"
    "photo_113@22-07-2026_09-40-19.jpg" = "0020\photo_2.webp"
    "photo_114@22-07-2026_09-40-19.jpg" = "0020\photo_3.webp"
    "photo_115@22-07-2026_09-40-19.jpg" = "0020\photo_4.webp"
    "photo_116@22-07-2026_09-40-19.jpg" = "0020\photo_5.webp"
    "photo_117@22-07-2026_09-40-19.jpg" = "0020\photo_6.webp"
    "photo_118@22-07-2026_09-40-19.jpg" = "0020\photo_7.webp"
    "photo_119@22-07-2026_09-40-19.jpg" = "0020\photo_8.webp"
    "photo_120@22-07-2026_09-40-19.jpg" = "0020\photo_9.webp"
    
    # Product 0021
    "photo_121@23-07-2026_17-07-06.jpg" = "0021\cover.webp"
    "photo_122@23-07-2026_17-07-06.jpg" = "0021\photo_1.webp"
    "photo_123@23-07-2026_17-07-06.jpg" = "0021\photo_2.webp"
    
    # Product 0022
    "photo_124@23-07-2026_17-07-14.jpg" = "0022\cover.webp"
    "photo_125@23-07-2026_17-07-14.jpg" = "0022\photo_1.webp"
    
    # Product 0023
    "photo_126@23-07-2026_17-07-22.jpg" = "0023\cover.webp"
    
    # Product 0024
    "photo_127@23-07-2026_17-07-29.jpg" = "0024\cover.webp"
    "photo_128@23-07-2026_17-07-29.jpg" = "0024\photo_1.webp"
    
    # Product 0025
    "photo_129@23-07-2026_17-07-37.jpg" = "0025\cover.webp"
    "photo_130@23-07-2026_17-07-38.jpg" = "0025\photo_1.webp"
    "photo_131@23-07-2026_17-07-38.jpg" = "0025\photo_2.webp"
    "photo_132@23-07-2026_17-07-38.jpg" = "0025\photo_3.webp"
    "photo_133@23-07-2026_17-07-38.jpg" = "0025\photo_4.webp"
    
    # Product 0026
    "photo_134@24-07-2026_07-28-02.jpg" = "0026\cover.webp"
    "photo_135@24-07-2026_07-28-02.jpg" = "0026\photo_1.webp"
    "photo_136@24-07-2026_07-28-02.jpg" = "0026\photo_2.webp"
    "photo_137@24-07-2026_07-28-02.jpg" = "0026\photo_3.webp"
    "photo_138@24-07-2026_07-28-02.jpg" = "0026\photo_4.webp"
    "photo_139@24-07-2026_07-28-02.jpg" = "0026\photo_5.webp"
    "photo_140@24-07-2026_07-28-02.jpg" = "0026\photo_6.webp"
    "photo_141@24-07-2026_07-28-02.jpg" = "0026\photo_7.webp"
    "photo_142@24-07-2026_07-28-02.jpg" = "0026\photo_8.webp"
    "photo_143@24-07-2026_07-28-02.jpg" = "0026\photo_9.webp"
    
    # Product 0027
    "photo_144@24-07-2026_07-28-09.jpg" = "0027\cover.webp"
    "photo_145@24-07-2026_07-28-10.jpg" = "0027\photo_1.webp"
    "photo_146@24-07-2026_07-28-10.jpg" = "0027\photo_2.webp"
    "photo_147@24-07-2026_07-28-10.jpg" = "0027\photo_3.webp"
    "photo_148@24-07-2026_07-28-10.jpg" = "0027\photo_4.webp"
    "photo_149@24-07-2026_07-28-10.jpg" = "0027\photo_5.webp"
    
    # Product 0028
    "photo_150@24-07-2026_07-28-18.jpg" = "0028\cover.webp"
    "photo_151@24-07-2026_07-28-18.jpg" = "0028\photo_1.webp"
    "photo_152@24-07-2026_07-28-18.jpg" = "0028\photo_2.webp"
    "photo_153@24-07-2026_07-28-18.jpg" = "0028\photo_3.webp"
    "photo_154@24-07-2026_07-28-18.jpg" = "0028\photo_4.webp"
    
    # Product 0029
    "photo_155@24-07-2026_07-28-25.jpg" = "0029\cover.webp"
    "photo_156@24-07-2026_07-28-25.jpg" = "0029\photo_1.webp"
    "photo_157@24-07-2026_07-28-25.jpg" = "0029\photo_2.webp"
    "photo_158@24-07-2026_07-28-25.jpg" = "0029\photo_3.webp"
    "photo_159@24-07-2026_07-28-25.jpg" = "0029\photo_4.webp"
    "photo_160@24-07-2026_07-28-25.jpg" = "0029\photo_5.webp"
    "photo_161@24-07-2026_07-28-25.jpg" = "0029\photo_6.webp"
    "photo_162@24-07-2026_07-28-25.jpg" = "0029\photo_7.webp"
    "photo_163@24-07-2026_07-28-25.jpg" = "0029\photo_8.webp"
    
    # Product 0030
    "photo_164@24-07-2026_07-28-32.jpg" = "0030\cover.webp"
    "photo_165@24-07-2026_07-28-32.jpg" = "0030\photo_1.webp"
    "photo_166@24-07-2026_07-28-32.jpg" = "0030\photo_2.webp"
    "photo_167@24-07-2026_07-28-32.jpg" = "0030\photo_3.webp"
    "photo_168@24-07-2026_07-28-32.jpg" = "0030\photo_4.webp"
    "photo_169@24-07-2026_07-28-32.jpg" = "0030\photo_5.webp"
    "photo_170@24-07-2026_07-28-32.jpg" = "0030\photo_6.webp"
    "photo_171@24-07-2026_07-28-32.jpg" = "0030\photo_7.webp"
    "photo_172@24-07-2026_07-28-32.jpg" = "0030\photo_8.webp"
    
    # Product 0031
    "photo_173@25-07-2026_08-54-37.jpg" = "0031\cover.webp"
    
    # Product 0032
    "photo_174@25-07-2026_08-56-23.jpg" = "0032\cover.webp"
    "photo_175@25-07-2026_08-56-23.jpg" = "0032\photo_1.webp"
    
    # Product 0033
    "photo_176@25-07-2026_08-56-33.jpg" = "0033\cover.webp"
    "photo_177@25-07-2026_08-56-33.jpg" = "0033\photo_1.webp"
    "photo_178@25-07-2026_08-56-33.jpg" = "0033\photo_2.webp"
    "photo_179@25-07-2026_08-56-33.jpg" = "0033\photo_3.webp"
}

$total = 0
$copied = 0
$missing = 0

foreach ($src in $imageMap.Keys) {
    $srcPath = Join-Path $sourceDir $src
    $destPath = Join-Path $destDir $imageMap[$src]
    $total++
    
    if (Test-Path $srcPath) {
        Copy-Item $srcPath -Destination $destPath -Force
        $copied++
        Write-Host "Copied: $src -> $($imageMap[$src])"
    } else {
        $missing++
        Write-Host "Missing: $src"
    }
}

Write-Host "========================================"
Write-Host "Summary:"
Write-Host "  - Total files: $total"
Write-Host "  - Copied: $copied"
Write-Host "  - Missing: $missing"
Write-Host "========================================"