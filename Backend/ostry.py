from dotenv import load_dotenv
import os

load_dotenv()  # take environment variables from .env

# Now you can access the variables
# my_var = os.getenv('MY_VAR')

for key, value in os.environ.items():
    print(f'{key}: {value}')
