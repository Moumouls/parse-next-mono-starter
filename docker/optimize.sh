rm -rf .yarn/cache
find ./node_modules -type f  \( -iname \*.d.ts -o -iname \*.js.map -o -iname \*.txt -o -iname \*.flow -o -iname \*.md -o -iname \*.test.js -o -iname \*.spec.js \) -delete
find ./packages -type f  \( -iname \*.d.ts -o -iname \*.js.map -o -iname \*.txt -o -iname \*.flow -o -iname \*.md -o -iname \*.test.js -o -iname \*.spec.js \) -delete
