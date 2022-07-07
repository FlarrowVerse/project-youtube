class Visualizer {
    static drawNetwork(ctx, network) {
        const margin = 50;
        const left = margin;
        const top = margin;
        const width = ctx.canvas.width - margin * 2;
        const height = ctx.canvas.height - margin * 2;

        const levelHeight = height / network.levels.length;

        for (let i = network.levels.length-1; i >= 0; i--) {
            const levelTop = top + 
            lerp(
                height - levelHeight,
                0,
                network.levels.length === 1 ? 0.5 : i / (network.levels.length - 1)
            );

            Visualizer.drawLevel(
                ctx, 
                network.levels[i], 
                left, 
                levelTop, 
                width, 
                levelHeight,
                i == network.levels.length-1 ? ["Up", "Left", "Right", "Rev."] : []
            );

        }

        
    }

    static drawLevel(ctx, level, left, top, width, height, outputLabels) {
        const right = left + width;
        const bottom = top + height;

        const nodeRadius = 18;

        const {inputs, outputs, weights, biases} = level;

        // connections between input and output of this level
        inputs.forEach((input, i) => {
            outputs.forEach((output, j) => {
                ctx.beginPath();
                ctx.moveTo(
                    Visualizer.#getNodeX(inputs, i, left, right),
                    bottom
                );
                ctx.lineTo(
                    Visualizer.#getNodeX(outputs, j, left, right),
                    top
                );
                // deciding connection transperancy based on weights
                ctx.lineWidth = 2;
                ctx.strokeStyle = getRGBA(weights[i][j]);
                // ctx.setLineDash([5, 5]);
                ctx.stroke();
            });        
        });

        // input of this level
        inputs.forEach((input, index) => {
            ctx.beginPath();
            ctx.arc(
                Visualizer.#getNodeX(inputs, index, left, right), 
                bottom, 
                nodeRadius, 
                0, 
                Math.PI * 2
            );
            ctx.fillStyle="black";
            ctx.fill();   

            ctx.beginPath();
            ctx.arc(
                Visualizer.#getNodeX(inputs, index, left, right), 
                bottom, 
                nodeRadius * 0.6, 
                0, 
                Math.PI * 2
            );
            ctx.fillStyle=getRGBA(input);
            ctx.fill();        
        });
        
        // output of this level
        outputs.forEach((output, index) => {
            const x = Visualizer.#getNodeX(outputs, index, left, right);

            ctx.beginPath();
            ctx.arc(x, top, nodeRadius, 0, Math.PI * 2);
            ctx.fillStyle="black";
            ctx.fill(); 

            ctx.beginPath();
            ctx.arc(x, top, nodeRadius * 0.6, 0, Math.PI * 2);
            ctx.fillStyle=getRGBA(output);
            ctx.fill();    
            
            ctx.beginPath();
            ctx.lineWidth = 5;
            ctx.arc(x, top, nodeRadius * 0.8, 0, Math.PI * 2);
            ctx.strokeStyle = getRGBA(biases[index]);
            ctx.setLineDash([3,3]);
            ctx.stroke();
            ctx.setLineDash([]);

            if (outputLabels[index]) {
                ctx.beginPath();
                ctx.textAlign = "center";
                ctx.textBaseLine = "middle";
                ctx.strokeStyle = "white";
                ctx.font = (nodeRadius * 1.5) + "px Arial";
                ctx.fillText(outputLabels[index], x, top-11);
                ctx.lineWidth = 0.5;
                ctx.strokeText(outputLabels[index], x, top-11);
            }
        });

        
    }

    static #getNodeX(nodes, index, left, right) {
        return lerp(
            left,
            right,
            nodes.length == 1 ? 0.5 : index / (nodes.length - 1)
        );
    }
}