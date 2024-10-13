Add-Type -AssemblyName System.Windows.Forms
Start-Sleep -Seconds 2  # Wait 2 seconds to allow you to focus CMD window

[System.Windows.Forms.SendKeys]::SendWait("cmd{ENTER}")
Start-Sleep -Milliseconds 500  # Wait half a second

# Now type the commands
[System.Windows.Forms.SendKeys]::SendWait("echo Hello, World!{ENTER}")
Start-Sleep -Milliseconds 500
[System.Windows.Forms.SendKeys]::SendWait("mkdir my_directory{ENTER}")
Start-Sleep -Milliseconds 500
[System.Windows.Forms.SendKeys]::SendWait("cd my_directory{ENTER}")
Start-Sleep -Milliseconds 500
[System.Windows.Forms.SendKeys]::SendWait("echo This is a test file. > my_file.txt{ENTER}")
Start-Sleep -Milliseconds 500
[System.Windows.Forms.SendKeys]::SendWait("dir{ENTER}")
Start-Sleep -Milliseconds 500

