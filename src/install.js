// customizable behavior
var shortName = "tagzilla";
var longName = "TagZilla 0.001";
var gVersion = "0.001";
var srDest = 160;

// this function verifies disk space in kilobytes
function verifyDiskSpace(dirPath, spaceRequired)
{
  var spaceAvailable;

  // Get the available disk space on the given path
  spaceAvailable = fileGetDiskSpaceAvailable(dirPath);

  // Convert the available disk space into kilobytes
  spaceAvailable = parseInt(spaceAvailable / 1024);

  // do the verification
  if (spaceAvailable < spaceRequired)
  {
    logComment("Insufficient disk space: " + dirPath);
    logComment("  required : " + spaceRequired + " K");
    logComment("  available: " + spaceAvailable + " K");
    return false;
  }

  return true;
}

// main code block
var err = initInstall(longName, shortName, gVersion);
logComment("initInstall: " + err);

var fProgram = getFolder("Program");
var fChrome = getFolder("Chrome");

if (verifyDiskSpace(fProgram, srDest))
{
  err = addDirectory("", gVersion, shortName, fChrome, shortName, true);
  logComment("addDirectory: " + err);

  registerChrome(CONTENT | DELAYED_CHROME, getFolder(fChrome, shortName),
    "content/");
  registerChrome(LOCALE | DELAYED_CHROME, getFolder(fChrome, shortName),
    "locale/en-US/");

  if (getLastError() == SUCCESS)
  {
    err = performInstall(); 
    logComment("performInstall: " + err);
  }
  else
  {
    cancelInstall(err);
  }
}
// end main