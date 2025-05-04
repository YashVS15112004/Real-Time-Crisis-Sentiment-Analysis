from flask import request

@app.route("/recommend", methods=["POST"])
def recommend_crop():
    data = request.get_json()

    required_fields = ['nitrogen', 'phosphorus', 'potassium', 'temperature', 'humidity', 'ph', 'rainfall']
    if not all(field in data and data[field] != "" for field in required_fields):
        return jsonify({"error": "Missing one or more required input fields."}), 400

    try:
        input_values = [float(data[field]) for field in ['temperature', 'rainfall', 'humidity', 'ph', 'nitrogen', 'phosphorus', 'potassium']]
        input_df = pd.DataFrame([input_values], columns=['Temperature', 'Rainfall', 'Humidity', 'Soil_pH', 'Nitrogen', 'Phosphorus', 'Potassium'])

        input_scaled = scaler.transform(input_df)

        crop_predictions = []
        for crop in range(len(label_encoder.classes_)):
            combined_input = np.hstack([input_scaled, [[crop]]])
            predicted_yield = model.predict(combined_input)[0]
            crop_predictions.append((crop, predicted_yield))

        best_crop_encoded = max(crop_predictions, key=lambda x: x[1])[0]
        best_crop = label_encoder.inverse_transform([best_crop_encoded])[0]
        best_yield = max(crop_predictions, key=lambda x: x[1])[1]

        return jsonify({
            "recommended_crop": best_crop,
            "expected_yield": f"{best_yield:.2f} tons/ha"
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500