# Builds JavaScript for Babbage.

# Copyright 2014 Google Inc. All rights reserved.

# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at

#     http://www.apache.org/licenses/LICENSE-2.0

# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

python closure-library/closure/bin/build/closurebuilder.py \
 --root=closure-library \
 --root=static/js/ \
 --namespace="com.tomscript.babbage" \
 --output_mode=compiled \
 --compiler_flags='--externs=static/js/externs.js' \
 --compiler_flags='--compilation_level=ADVANCED_OPTIMIZATIONS' \
 --compiler_jar=closure-compiler/compiler.jar > static/js/main-compiled.js
