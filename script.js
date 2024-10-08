// - x1 - 2 is the top - left point to the top - middle point
// - x2 - 3 is the top - middle point to the top - right point
// - x4 - 5 is the middle - left point to the absolute middle point
// - x5 - 6 is the absolute middle point to the middle - right point
// - x7 - 8 is the bottom - left point to the bottom - middle point
// - x8 - 9 is the bottom - middle point to the bottom - right point
// - y1 - 4 is the top - left point to the middle - left point
// - y4 - 7 is the middle - left point to the bottom - left point
// - y2 - 5 is the top - middle point to the absolute middle point
// - y5 - 8 is the absolute middle point to the bottom - middle point
// - y3 - 6 is the top - right point to the right - middle point
// - y3 - 6 is the right - middle point to the bottom - right point
// This is a 9-point rectangle where the points from the top-left to top-right are 1,2,3,
// then in the middle row(from left to right) 4, 5, 6, then in the bottom row(left to right) 7, 8, 9
// The square being drawn is about a central vertical and horizontal line that represents the origin (0,0).

document.addEventListener('DOMContentLoaded', function () {
    const distortionTolerance = 0.0001;  // Define a small tolerance for floating-point comparison
    const targetSizeInput = document.getElementById('target-size');
    const resetMeasuresCheckbox = document.getElementById('reset-measures');

    // Angle Section
    const xAngleInput = document.getElementById('x-angle');
    const xAngleImage = document.querySelector('img[alt="Image 1"]');

    // X Galvo Section
    const xDistortionInput = document.getElementById('x-distortion');
    const xParalellogramInput = document.getElementById('x-paralellogram');
    const xTrapezoidInput = document.getElementById('x-trapezoid');
    const xDistortionImage = document.querySelector('img[alt="Image 2"]');
    const xParalellogramImage = document.querySelector('img[alt="Image 3"]');
    const xTrapezoidImage = document.querySelector('img[alt="Image 4"]');

    // Y Galvo Section
    const yDistortionInput = document.getElementById('y-distortion');
    const yParalellogramInput = document.getElementById('y-paralellogram');
    const yTrapezoidInput = document.getElementById('y-trapezoid');
    const yDistortionImage = document.querySelector('img[alt="Image 5"]');
    const yParalellogramImage = document.querySelector('img[alt="Image 6"]');
    const yTrapezoidImage = document.querySelector('img[alt="Image 7"]');


    const gridInputs = [
        document.getElementById('x1-2'),
        document.getElementById('x2-3'),
        document.getElementById('x4-5'),
        document.getElementById('x5-6'),
        document.getElementById('x7-8'),
        document.getElementById('x8-9'),
        document.getElementById('y1-4'),
        document.getElementById('y4-7'),
        document.getElementById('y2-5'),
        document.getElementById('y5-8'),
        document.getElementById('y3-6'),
        document.getElementById('y6-9')
    ];

    function calculateAngle() {
        // Step 1: Retrieve the rotated distances from the input fields
        const x1_2 = parseFloat(document.getElementById('x1-2').value);
        const x2_3 = parseFloat(document.getElementById('x2-3').value);
        const x4_5 = parseFloat(document.getElementById('x4-5').value);
        const x5_6 = parseFloat(document.getElementById('x5-6').value);
        const x7_8 = parseFloat(document.getElementById('x7-8').value);
        const x8_9 = parseFloat(document.getElementById('x8-9').value);

        const y1_4 = parseFloat(document.getElementById('y1-4').value);
        const y4_7 = parseFloat(document.getElementById('y4-7').value);
        const y2_5 = parseFloat(document.getElementById('y2-5').value);
        const y5_8 = parseFloat(document.getElementById('y5-8').value);
        const y3_6 = parseFloat(document.getElementById('y3-6').value);
        const y6_9 = parseFloat(document.getElementById('y6-9').value);

        // Step 2: Calculate the positions of the points based on the distances
        const topLeftX = -x1_2;
        const topLeftY = y1_4;

        const topRightX = x2_3;
        const topRightY = y3_6;

        const bottomLeftX = -x7_8;
        const bottomLeftY = -y4_7;

        const bottomRightX = x8_9;
        const bottomRightY = -y6_9;

        // Step 3: Calculate the angles between these points
        // Angle from top-left to top-right (should represent the top edge)
        let topLeftAngle = Math.atan2(topRightY - topLeftY, topRightX - topLeftX) * (180 / Math.PI);

        // Angle from top-right to bottom-right (should represent the right edge)
        let topRightAngle = Math.atan2(bottomRightY - topRightY, bottomRightX - topRightX) * (180 / Math.PI) + 90;

        // Angle from bottom-right to bottom-left (should represent the bottom edge)
        let bottomRightAngle = Math.atan2(bottomLeftY - bottomRightY, bottomLeftX - bottomRightX) * (180 / Math.PI);

        // Angle from bottom-left to top-left (should represent the left edge)
        let bottomLeftAngle = Math.atan2(topLeftY - bottomLeftY, topLeftX - bottomLeftX) * (180 / Math.PI) - 90;

        // Step 4: Normalize the angles to be within the range of -90 to 90 degrees
        topLeftAngle = normalizeAngle(topLeftAngle);
        topRightAngle = normalizeAngle(topRightAngle);
        bottomRightAngle = normalizeAngle(bottomRightAngle);
        bottomLeftAngle = normalizeAngle(bottomLeftAngle);

        // console.log("Normalized Top-Left to Top-Right Angle:", topLeftAngle);
        // console.log("Normalized Top-Right to Bottom-Right Angle:", topRightAngle);
        // console.log("Normalized Bottom-Right to Bottom-Left Angle:", bottomRightAngle);
        // console.log("Normalized Bottom-Left to Top-Left Angle:", bottomLeftAngle);

        // Step 5: Average the angles to get the overall rotation.
        const averageAngle = (topLeftAngle + topRightAngle + bottomRightAngle + bottomLeftAngle) / 4;
        return averageAngle.toFixed(2);
    }

    // Helper function to normalize the angle within the range of -90 to 90 degrees
    function normalizeAngle(angle) {
        while (angle > 90) {
            angle -= 180;
        }
        while (angle < -90) {
            angle += 180;
        }
        return angle;
    }

    function updateImageClassBasedOnAngle() {
        // Calculate the rotation angle
        const angle = calculateAngle();

        // Update the image source based on the angle
        if (parseFloat(angle) === 0) {
            xAngleImage.src = "ezCAD-Helpers/ezCAD-Helpers.007.jpeg";
        } else {
            xAngleImage.src = "ezCAD-Helpers/ezCAD-Helpers.002.jpeg";
        }

        // Apply or remove the mirror-x class based on the angle
        if (parseFloat(angle) > 0) {
            xAngleImage.classList.add('mirror-x');
        } else {
            xAngleImage.classList.remove('mirror-x');
        }
    }

    function calculateXScale() {
        const x4_5 = parseFloat(document.getElementById('x4-5').value);
        const x5_6 = parseFloat(document.getElementById('x5-6').value);
        const targetSize = parseFloat(document.getElementById('target-size').value);

        if (!targetSize || isNaN(x4_5) || isNaN(x5_6)) {
            return 0; // Return 0 if any input is invalid
        }
        const xScale = ((x4_5 + x5_6) / targetSize) * 100;
        return xScale.toFixed(2); // Return the result as a percentage with 2 decimal places
    }

    function calculateYScale() {
        const y2_5 = parseFloat(document.getElementById('y2-5').value);
        const y5_8 = parseFloat(document.getElementById('y5-8').value);
        const targetSize = parseFloat(document.getElementById('target-size').value);

        if (!targetSize || isNaN(y2_5) || isNaN(y5_8)) {
            return 0; // Return 0 if any input is invalid
        }
        const yScale = ((y2_5 + y5_8) / targetSize) * 100;
        return yScale.toFixed(2); // Return the result as a percentage with 2 decimal places
    }

    function calculateXDistortion() {
        // Step 1: Retrieve the lengths of the x-segments from the input fields
        const x1_2 = parseFloat(document.getElementById('x1-2').value);
        const x2_3 = parseFloat(document.getElementById('x2-3').value);
        const x4_5 = parseFloat(document.getElementById('x4-5').value);
        const x5_6 = parseFloat(document.getElementById('x5-6').value);
        const x7_8 = parseFloat(document.getElementById('x7-8').value);
        const x8_9 = parseFloat(document.getElementById('x8-9').value);

        // Step 2: Calculate the average of the top and bottom x-segments
        const topBottomAverage = (x1_2 + x2_3 + x7_8 + x8_9) / 2;

        // Step 3: Calculate the average of the middle x-segments
        const middleAverage = (x4_5 + x5_6);

        // Step 4: Calculate the distortion
        const xDistortion = -(middleAverage - topBottomAverage);
        return xDistortion.toFixed(2);
    }

    function calculateYDistortion() {
        // Step 1: Retrieve the lengths of the y-segments from the input fields
        const y1_4 = parseFloat(document.getElementById('y1-4').value);
        const y4_7 = parseFloat(document.getElementById('y4-7').value);
        const y2_5 = parseFloat(document.getElementById('y2-5').value);
        const y5_8 = parseFloat(document.getElementById('y5-8').value);
        const y3_6 = parseFloat(document.getElementById('y3-6').value);
        const y6_9 = parseFloat(document.getElementById('y6-9').value);

        // Step 2: Calculate the average of the left and right y-segments
        const leftRightAverage = (y1_4 + y4_7 + y3_6 + y6_9) / 2;

        // Step 3: Calculate the average of the middle y-segments
        const middleAverage = (y2_5 + y5_8);

        // Step 4: Calculate the distortion
        const yDistortion = -(middleAverage - leftRightAverage);
        return yDistortion.toFixed(2);
    }

    function calculateXParalellogram() {
        // Step 1: Retrieve the lengths of the x-segments from the input fields
        const x1_2 = parseFloat(document.getElementById('x1-2').value);
        const x2_3 = parseFloat(document.getElementById('x2-3').value);
        const x7_8 = parseFloat(document.getElementById('x7-8').value);
        const x8_9 = parseFloat(document.getElementById('x8-9').value);

        // Step 2: Calculate the parallelogram shift
        const xParalellogram = -((x1_2 - x7_8) - (x2_3 - x8_9));
        return xParalellogram.toFixed(2);
    }

    function calculateYParalellogram() {
        // Step 1: Retrieve the lengths of the y-segments from the input fields
        const y1_4 = parseFloat(document.getElementById('y1-4').value);
        const y4_7 = parseFloat(document.getElementById('y4-7').value);
        const y3_6 = parseFloat(document.getElementById('y3-6').value);
        const y6_9 = parseFloat(document.getElementById('y6-9').value);

        // Step 2: Calculate the parallelogram shift
        const yParalellogram = (y3_6 - y1_4) - (y6_9 - y4_7);
        return yParalellogram.toFixed(2);
    }

    function calculateXTrapezoid() {
        // Step 1: Retrieve the lengths of the x-segments from the input fields
        const x1_2 = parseFloat(document.getElementById('x1-2').value);
        const x2_3 = parseFloat(document.getElementById('x2-3').value);
        const x7_8 = parseFloat(document.getElementById('x7-8').value);
        const x8_9 = parseFloat(document.getElementById('x8-9').value);

        // Step 2: Calculate the trapezoid shift
        const xTrapezoid = -((x1_2 + x2_3) - (x7_8 + x8_9));

        return xTrapezoid.toFixed(2);
    }

    function calculateYTrapezoid() {
        // Step 1: Retrieve the lengths of the y-segments from the input fields
        const y1_4 = parseFloat(document.getElementById('y1-4').value);
        const y4_7 = parseFloat(document.getElementById('y4-7').value);
        const y3_6 = parseFloat(document.getElementById('y3-6').value);
        const y6_9 = parseFloat(document.getElementById('y6-9').value);

        // Step 2: Calculate the trapezoid shift
        const yTrapezoid = -((y1_4 + y4_7) - (y3_6 + y6_9));

        return yTrapezoid.toFixed(2);
    }

    // Function to update grid inputs based on target size
    function updateGridInputs() {
        const targetValue = parseFloat(targetSizeInput.value) || 0;
        const halfValue = targetValue / 2;

        gridInputs.forEach(input => {
            input.value = halfValue.toFixed(2);
        });
        doCalculations();
    }

    // Function to update the angle and related image class
    function updateAngle() {
        const angle = calculateAngle();
        xAngleInput.value = angle;
        updateImageClassBasedOnAngle();
    }

    function updateScale() {
        const xScalePercentage = calculateXScale();
        const yScalePercentage = calculateYScale();

        // Update the X scale input field
        const xScaleInput = document.getElementById('x-scale');
        if (xScaleInput) {
            xScaleInput.value = xScalePercentage;
        }

        // Update the Y scale input field
        const yScaleInput = document.getElementById('y-scale');
        if (yScaleInput) {
            yScaleInput.value = yScalePercentage;
        }
    }

    // Function to update distortion values
    function updateDistortions() {
        const xDistortionResult = parseFloat(calculateXDistortion());
        xDistortionInput.value = xDistortionResult;
        if (xDistortionResult < 0) {
            xDistortionImage.src = "ezCAD-Helpers/ezCAD-Helpers.004.jpeg";
        } else {
            xDistortionImage.src = "ezCAD-Helpers/ezCAD-Helpers.005.jpeg";
        }

        const yDistortionResult = parseFloat(calculateYDistortion());
        yDistortionInput.value = yDistortionResult;
        if (yDistortionResult < 0) {
            yDistortionImage.src = "ezCAD-Helpers/ezCAD-Helpers.004.jpeg";
        } else {
            yDistortionImage.src = "ezCAD-Helpers/ezCAD-Helpers.005.jpeg";
        }
    }

    function updateParalellograms() {
        const xParalellogramResult = parseFloat(calculateXParalellogram());
        xParalellogramInput.value = xParalellogramResult;
        if (xParalellogramResult > 0) {
            xParalellogramImage.classList.remove('mirror-y');
        } else {
            xParalellogramImage.classList.add('mirror-y');
        }

        const yParalellogramResult = parseFloat(calculateYParalellogram());
        yParalellogramInput.value = yParalellogramResult;
        if (yParalellogramResult < 0) {
            yParalellogramImage.classList.remove('mirror-y');
        } else {
            yParalellogramImage.classList.add('mirror-y');
        }
    }

    function updateTrapezoids() {
        const xTrapezoidResult = parseFloat(calculateXTrapezoid());
        xTrapezoidInput.value = xTrapezoidResult;
        if (xTrapezoidResult < 0) {
            xTrapezoidImage.classList.add('mirror-y');
        } else {
            xTrapezoidImage.classList.remove('mirror-y');
        }

        const yTrapezoidResult = parseFloat(calculateYTrapezoid());
        yTrapezoidInput.value = yTrapezoidResult;
        if (yTrapezoidResult < 0) {
            yTrapezoidImage.classList.remove('mirror-x');
        } else {
            yTrapezoidImage.classList.add('mirror-x');
        }
    }

    function updateRectangleVisualization() {
        const containerWidth = 400;
        const containerHeight = 400;

        const x1_2 = parseFloat(document.getElementById('x1-2').value);
        const x2_3 = parseFloat(document.getElementById('x2-3').value);
        const x4_5 = parseFloat(document.getElementById('x4-5').value);
        const x5_6 = parseFloat(document.getElementById('x5-6').value);
        const x7_8 = parseFloat(document.getElementById('x7-8').value);
        const x8_9 = parseFloat(document.getElementById('x8-9').value);

        const y1_4 = parseFloat(document.getElementById('y1-4').value);
        const y4_7 = parseFloat(document.getElementById('y4-7').value);
        const y2_5 = parseFloat(document.getElementById('y2-5').value);
        const y5_8 = parseFloat(document.getElementById('y5-8').value);
        const y3_6 = parseFloat(document.getElementById('y3-6').value);
        const y6_9 = parseFloat(document.getElementById('y6-9').value);

        const halfWidth = containerWidth / 2;
        const halfHeight = containerHeight / 2;

        const exaggerationFactor = 3;

        const points = {
            "point-1": { x: halfWidth - (x1_2 * exaggerationFactor), y: halfHeight - (y1_4 * exaggerationFactor) },
            "point-2": { x: halfWidth, y: halfHeight - (y2_5 * exaggerationFactor) },
            "point-3": { x: halfWidth + (x2_3 * exaggerationFactor), y: halfHeight - (y3_6 * exaggerationFactor) },
            "point-4": { x: halfWidth - (x4_5 * exaggerationFactor), y: halfHeight },
            "point-5": { x: halfWidth, y: halfHeight },
            "point-6": { x: halfWidth + (x5_6 * exaggerationFactor), y: halfHeight },
            "point-7": { x: halfWidth - (x7_8 * exaggerationFactor), y: halfHeight + (y4_7 * exaggerationFactor) },
            "point-8": { x: halfWidth, y: halfHeight + (y5_8 * exaggerationFactor) },
            "point-9": { x: halfWidth + (x8_9 * exaggerationFactor), y: halfHeight + (y6_9 * exaggerationFactor) }
        };

        let maxX = 0;
        let maxY = 0;

        for (let pointId in points) {
            const { x, y } = points[pointId];
            maxX = Math.max(maxX, Math.abs(x - halfWidth));
            maxY = Math.max(maxY, Math.abs(y - halfHeight));
        }

        const maxDimension = Math.max(maxX, maxY);
        const scaleFactor = Math.min(containerWidth / 2, containerHeight / 2) / maxDimension;

        for (let pointId in points) {
            points[pointId].x = halfWidth + (points[pointId].x - halfWidth) * scaleFactor;
            points[pointId].y = halfHeight + (points[pointId].y - halfHeight) * scaleFactor;
        }

        // Adjust positions to center the 10px point
        for (let pointId in points) {
            const point = document.getElementById(pointId);
            point.style.left = (points[pointId].x - 5) + 'px';
            point.style.top = (points[pointId].y - 5) + 'px';
        }
    }

    function updateOpacityBasedOnValue() {
        // Select all image-item elements
        const imageItems = document.querySelectorAll('.image-item');

        imageItems.forEach(item => {
            // Find the input element within the image-item
            const input = item.querySelector('input[type="text"]');

            if (input) {
                // Check if the input value is zero
                if (parseFloat(input.value) === 0) {
                    item.style.opacity = '0.2';
                } else {
                    item.style.opacity = '1'; // Reset opacity if not zero
                }
            }
        });
    }

    function convertUnits() {
        // Check if the checkbox is checked
        const usePercentage = document.getElementById('use-percentage').checked;

        // Get the target size value
        const targetSize = parseFloat(document.getElementById('target-size').value);

        // If the checkbox is not checked or target size is invalid, return
        if (!usePercentage || isNaN(targetSize) || targetSize === 0) {
            return;
        }

        // Array of input IDs that need to be converted
        const inputIds = [
            'x-distortion',
            'x-paralellogram',
            'x-trapezoid',
            'y-distortion',
            'y-paralellogram',
            'y-trapezoid'
        ];

        // Convert each value to a percentage of the target size
        inputIds.forEach(id => {
            const input = document.getElementById(id);
            const value = parseFloat(input.value);
            if (!isNaN(value)) {
                const percentageValue = (value / targetSize) * 100;
                input.value = percentageValue.toFixed(2) + '%';
            }
        });
    }

    // Example of your doCalculations function with convertUnits added
    function doCalculations() {
        updateAngle();
        updateScale();
        updateDistortions();
        updateParalellograms();
        updateTrapezoids();
        updateRectangleVisualization();
        updateOpacityBasedOnValue();
        convertUnits();  // Add convertUnits() at the end
    }

    // Initial trigger for grid inputs and calculations on page load
    updateGridInputs();
    doCalculations();

    // Update grid inputs and related calculations when target size changes
    targetSizeInput.addEventListener('input', updateGridInputs);

    // Update angle and distortions whenever any grid input changes
    gridInputs.forEach(input => {
        input.addEventListener('input', () => {
            doCalculations();
        });
    });

    const resetButton = document.getElementById('reset-measures-button');
    resetButton.addEventListener('click', updateGridInputs);

    const unitsCheck = document.getElementById('use-percentage');
    unitsCheck.addEventListener('click', doCalculations);
});
