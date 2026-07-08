"""Run this once to create the sample GLB cube: python make_sample_glb.py"""
import struct, json, os

def pad4(data, pad_byte=b'\x00'):
    r = len(data) % 4
    return data + pad_byte * ((4 - r) % 4)

positions = [
    -0.5,-0.5,-0.5,  0.5,-0.5,-0.5,  0.5, 0.5,-0.5, -0.5, 0.5,-0.5,
    -0.5,-0.5, 0.5,  0.5,-0.5, 0.5,  0.5, 0.5, 0.5, -0.5, 0.5, 0.5,
]
indices = [
    0,2,1, 0,3,2,
    4,5,6, 4,6,7,
    0,4,7, 0,7,3,
    1,2,6, 1,6,5,
    0,1,5, 0,5,4,
    3,7,6, 3,6,2,
]

idx_bytes = struct.pack(f'<{len(indices)}H', *indices)
pos_bytes = struct.pack(f'<{len(positions)}f', *positions)
bin_data  = idx_bytes + pos_bytes

gltf = {
    "asset": {"version": "2.0"},
    "scene": 0,
    "scenes": [{"nodes": [0]}],
    "nodes": [{"mesh": 0, "name": "Cube"}],
    "meshes": [{"name": "Cube", "primitives": [{"attributes": {"POSITION": 1}, "indices": 0}]}],
    "accessors": [
        {"bufferView": 0, "componentType": 5123, "count": len(indices), "type": "SCALAR"},
        {"bufferView": 1, "componentType": 5126, "count": 8, "type": "VEC3",
         "min": [-0.5, -0.5, -0.5], "max": [0.5, 0.5, 0.5]},
    ],
    "bufferViews": [
        {"buffer": 0, "byteOffset": 0, "byteLength": len(idx_bytes), "target": 34963},
        {"buffer": 0, "byteOffset": len(idx_bytes), "byteLength": len(pos_bytes), "target": 34962},
    ],
    "buffers": [{"byteLength": len(bin_data)}],
}

json_bytes = pad4(json.dumps(gltf, separators=(',', ':')).encode(), b' ')
bin_padded = pad4(bin_data)

total    = 12 + 8 + len(json_bytes) + 8 + len(bin_padded)
header   = struct.pack('<III', 0x46546C67, 2, total)
jchunk_h = struct.pack('<II', len(json_bytes), 0x4E4F534A)
bchunk_h = struct.pack('<II', len(bin_padded), 0x004E4942)

out = os.path.join(os.path.dirname(__file__),
                   'frontend', 'public', 'models', 'sample-part.glb')
os.makedirs(os.path.dirname(out), exist_ok=True)
with open(out, 'wb') as f:
    f.write(header + jchunk_h + json_bytes + bchunk_h + bin_padded)

print(f"Created {out} ({total} bytes)")
