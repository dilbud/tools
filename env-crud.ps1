# use 'Machine' or 'User' for env

# GET
$currentPath = [Environment]::GetEnvironmentVariable('Foo', 'Machine')

# SET
[Environment]::SetEnvironmentVariable('Foo', $newPath, 'Machine')

# REMOVE
[Environment]::SetEnvironmentVariable('Foo', $null, 'Machine')

# example
$currentPath = [Environment]::GetEnvironmentVariable('Path', 'Machine')
$newPath = $currentPath -replace [Regex]::Escape('C:\Program Files\Common Files\Oracle\Java\javapath;'), ''
[Environment]::SetEnvironmentVariable('Path', $newPath, 'Machine')
