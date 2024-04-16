const mindee = require("mindee")

exports.callMindeeApi = async (req, res) => {
    const { image } = req.body;
  

    try {
        const mindeeClient = new mindee.Client({ apiKey: "159679e4a0fc0e56ee914a88626d06fc" });

        const inputSource = mindeeClient.docFromBase64(image, 'sample.jpeg');

        const apiResponse = mindeeClient.enqueueAndParse(mindee.product.InternationalIdV2, inputSource);
            

        apiResponse.then((resp) => {
            res.json(resp.document)
        }).catch((err) => {
            res.status(400).json({error: err})
        });
    

        

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ error: "An error occurred while processing the document." });
    }
  };