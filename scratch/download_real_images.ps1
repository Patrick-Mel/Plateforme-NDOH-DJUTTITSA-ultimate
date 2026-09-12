$headers = @{ 'User-Agent' = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }

$images = [ordered]@{
    'cte-djuttitsa-tea.jpg'        = 'https://upload.wikimedia.org/wikipedia/commons/0/07/Tea_farming_in_Cameroon_01.jpg'
    'chefferie-ndoh-djuttitsa.jpg'  = 'https://upload.wikimedia.org/wikipedia/commons/5/50/Entr%C3%A9e_Chefferie_Bamilek%C3%A9.jpg'
    'cma-ndoh-djuttitsa.jpg'        = 'https://upload.wikimedia.org/wikipedia/commons/4/4b/M%C3%A9d%C3%A9cins_Hopital_Douala_Cameroun_28.jpg'
    'ecole-djuttitsa.jpg'            = 'https://upload.wikimedia.org/wikipedia/commons/9/96/Remise_WikiChallenge_Cameroun_2023_B.jpg'
    'evenement-ndoh.jpg'            = 'https://upload.wikimedia.org/wikipedia/commons/7/79/NKEUNIA_danse_BAMILEKE_au_Cameroun.jpg'
    'monts-bamboutos.jpg'          = 'https://upload.wikimedia.org/wikipedia/commons/a/aa/La_falaise_de_Dschang_sous_la_brume%2C_Cameroun.jpg'
}

foreach ($item in $images.GetEnumerator()) {
    $name = $item.Key
    $url = $item.Value
    $outFile = "public/images/$name"
    Write-Host "Downloading real photo from Wikimedia: $name"
    Invoke-WebRequest -Uri $url -OutFile $outFile -Headers $headers
    Write-Host "Done: $outFile"
}
