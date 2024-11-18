#!/bin/bash

# Load environment variables
set -a; source .env; set +a

# Execute command passed as arguments to this script
"$@"
