export async function generateProject({
  projectDirectory
}: {
  projectDirectory: string
}): Promise<{
}> {
  prepareDirectory({
    projectDirectory
  })
  removeExtraneousFiles({
    projectDirectory
  })
  addGitignore({
    projectDirectory
  })
  return {}
}


async function prepareDirectory({
  projectDirectory
}: {
  projectDirectory: string
}): Promise<{
}> {
  // FIXME - implement this
  return {}
}

async function removeExtraneousFiles({
  projectDirectory
}: {
  projectDirectory: string
}): Promise<{
}> {
  // FIXME - implement this
  return {}
}

async function addGitignore({
  projectDirectory
}: {
  projectDirectory: string
}): Promise<{
}> {
  // FIXME - implement this
  return {}
}
