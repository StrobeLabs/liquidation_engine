extern crate serde;
extern crate serde_json;
extern crate ethers;

use ethers::types::{Bytes, U256};
use serde::Deserialize;
use std::fs::File;
use std::io::Read;

#[derive(Deserialize)]
struct ZkProof {
    instances: Vec<Vec<Vec<u64>>>,
    proof: Vec<u8>,
}

pub fn json_to_proof(file_path: &str) -> Result<(Vec<U256>, Bytes), Box<dyn std::error::Error>> {
    // Read the file to a string
    let mut file = File::open(file_path)?;
    let mut json_str = String::new();
    file.read_to_string(&mut json_str)?;

    // Deserialize the JSON string
    let proof: ZkProof = serde_json::from_str(&json_str)?;

    let mut public_inputs: Vec<U256> = vec![];
    let flattened_instances = proof.instances.into_iter().flatten().flatten();

    for val in flattened_instances {
        let bytes = val.to_be_bytes();  // Convert u64 to bytes in big-endian format
        let u = U256::from_little_endian(&bytes);
        public_inputs.push(u);
    }    

    let proof_bytes = Bytes::from(proof.proof);

    Ok((public_inputs, proof_bytes))
}

fn main() {
    //let file_path = "../model.proof";
    // let file_path = "test.json";
    let file_path = "model.json";
    match json_to_proof(file_path) {
        Ok((public_inputs, proof_bytes)) => {
            let single_instance = public_inputs.get(0); // gets the first value or defaults to zero
            println!("public_inputs: {:?}", public_inputs);
            println!("public_inputs2: {:?}", single_instance);
            println!("proof_bytes: {:?}", proof_bytes);
        }
        Err(e) => {
            println!("Error reading and processing proof: {}", e);
        }
    }
}
