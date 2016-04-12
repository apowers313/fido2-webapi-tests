# fido2-webapi-tests

This project is mostly generated automatically by [hiptest-publisher](https://github.com/hiptest/hiptest-publisher) using [fido2-test-builder](https://github.com/apowers313/fido2-test-builder).

Edit files at your own risk.

## Installing

`git clone https://github.com/apowers313/fido2-webapi-tests.git`

## Running

Fire up web server:
``` bash
python -m SimpleHTTPServer 8000
```

Then browse over to `test.html`. For example:
```
open test.html
```

This will automatically run all the tests in project_test.js

If your implementation requires some custom code, you can pass a URL query string to automatically load your javascript:
```
test.html?client-script=foo.js
```

Good luck!