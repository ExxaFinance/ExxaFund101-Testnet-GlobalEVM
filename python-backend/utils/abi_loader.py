# utils/abi_loader.py

import json
import os

"""
Simple utility to load smart contract ABIs from the local filesystem.

It assumes ABIs are stored in a folder called `abi/` relative to project root.
"""

def load_abi(contract_name: str) -> dict:
    """
    Loads a JSON ABI from the `abi/` directory.

    Args:
        contract_name (str): The name of the ABI file without `.json`

    Returns:
        dict: Parsed ABI object
    """
    abi_path = os.path.join("abi", f"{contract_name}.json")

    if not os.path.exists(abi_path):
        raise FileNotFoundError(f"ABI file not found: {abi_path}")

    with open(abi_path, "r") as file:
        return json.load(file)
