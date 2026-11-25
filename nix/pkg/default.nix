# @yao-pkg/pkg, with the whole dependency tree pinned by package-lock.json.
# To update: change the version in package.json, run
#   npm install --package-lock-only --ignore-scripts
# in this directory, and set npmDepsHash to lib.fakeHash to read the new hash from the build error.
{ buildNpmPackage, lib }:

buildNpmPackage {
  pname = "yao-pkg";
  version = "6.26.0";

  src = ./.;

  npmDepsHash = "sha256-9/RxnkdUWRDwl520tyicZWSMhWQCEW/6tqC3Bl4itLQ=";
  npmFlags = [ "--ignore-scripts" ];
  dontNpmBuild = true;

  postInstall = ''
    mkdir -p $out/bin
    ln -s $out/lib/node_modules/yao-pkg-tool/node_modules/@yao-pkg/pkg/lib-es5/bin.js $out/bin/pkg
  '';

  meta = {
    description = "Package a Node.js project into an executable";
    homepage = "https://github.com/yao-pkg/pkg";
    license = lib.licenses.mit;
    mainProgram = "pkg";
  };
}
