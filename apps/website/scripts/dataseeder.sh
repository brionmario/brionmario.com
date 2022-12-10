#!/usr/bin/env bash

# -------------------------------------------------------------------------------------
#
# MIT License
#
# Copyright (c) 2022 Brion Mario
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.
#
# --------------------------------------------------------------------------------------

# ======================================================================================
# Script to populate data for the website.
# ======================================================================================

# Inputs
GH_ACCESS_TOKEN=$1
SITE_NAME=${2:-brionmario.com}
GH_REPO_OWNER=${2:-brionmario}

# Constants
GH_PER_PAGE_DEFAULT_COUNT=100
SELF_PATH="$(dirname "$(realpath "$0")")"
GH_PROJECTS_OUTPUT_PATH="$SELF_PATH/../data/autogen/gh_projects.json"

CHECKPOINTS_COUNT=1

function set_gh_authorization() {
  if [ -z "$GH_ACCESS_TOKEN" ]
    then
      echo "No access token supplied. Access Token should be supplied as the first argument for this script."
      echo "Falling back to default no-authorization mode..."

      GH_AUTHORIZATION=""
    else
      GH_AUTHORIZATION="Authorization: Bearer $GH_ACCESS_TOKEN"
  fi
}

function checkpoint() {
  echo "\n================================================================================================"
  echo "# $CHECKPOINTS_COUNT $1"
  echo "================================================================================================\n"
  CHECKPOINTS_COUNT=$((CHECKPOINTS_COUNT + 1))
}

function generate_gh_projects() {
  checkpoint "🐱 Generating GitHub Project list."

  # Override if neceesary.
  authorization=$GH_AUTHORIZATION
  repo_owner=$GH_REPO_OWNER
  per_page=$GH_PER_PAGE_DEFAULT_COUNT
  projects=()
  page=1

  while : ; do
      echo "\n🤘 PAGE $page - Fetching repo list."
      result=$(curl -H "Accept: application/vnd.github+json" -H "$authorization" https://api.github.com/users/$repo_owner/repos?page=$page\&per_page=$per_page | sed -e 's/^\[$//g' -e 's/^\]$/,/g')

      results_as_array=(${result[@]})

      if [ ${#results_as_array[*]} -eq 1 ]; then
          echo "\n⛔️ PAGE $page - Response is empty. Treating the situation as end of pagination..."
          break
      else
        projects=(${projects[@]} ${result[@]})
        page=$((page + 1))
      fi
  done

  last_char=$(printf %s\\n "${projects[@]:(-1)}")
  if [ $last_char == "," ]; then
    echo "\n🌚 There's a trailing comma(,) in the array. Removing it now..."
    unset projects[${#projects[@]}-1]
  fi

cat <<EOF > "$GH_PROJECTS_OUTPUT_PATH"
[$(echo "${projects[*]}")]
EOF

cat <<EOF > "$GH_PROJECTS_OUTPUT_PATH"
$(jq '.' "$GH_PROJECTS_OUTPUT_PATH")
EOF

echo "\n🎉 Generating GitHub Project list completed."
}

# ======================================================================================
# Execution starts from here
# ======================================================================================

echo "\n============ 💥 Welcome to the $SITE_NAME Data Seeder 💥 ============\n"

set_gh_authorization
generate_gh_projects
