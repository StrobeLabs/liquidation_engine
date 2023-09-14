import torch
import torch.nn as nn
import torch.nn.functional as F
import torch.onnx

class RiskScoreModel(nn.Module):
    def __init__(self, input_dim=3, hidden_dim=10, output_dim=1):
        super(RiskScoreModel, self).__init__()
        
        # Define the architecture
        self.fc1 = nn.Linear(input_dim, hidden_dim)
        self.fc2 = nn.Linear(hidden_dim, hidden_dim)
        self.fc3 = nn.Linear(hidden_dim, output_dim)

    def forward(self, x):
        x = F.relu(self.fc1(x))
        x = F.relu(self.fc2(x))
        x = torch.sigmoid(self.fc3(x))  # Sigmoid to ensure output is between 0 and 1
        return x

# Sample input
# S = 1000, P = 50, M = 5
sample_input = torch.tensor([1000.0, 50.0, 5.0])

# Model instantiation and forward pass
model = RiskScoreModel()
output = model(sample_input)

print("Risk Score: ")
print(output.item())

# Set the model to evaluation mode
model.eval()

# Dummy input similar to the actual input you would have in your use case
dummy_input = torch.tensor([1000.0, 50.0, 5.0])

# Export the model
onnx_filename = "liquidation_score_model.onnx"
torch.onnx.export(model, dummy_input, onnx_filename)

print("Model exported to liquidation_score_model")
