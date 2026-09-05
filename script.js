// ==========================================
// BIS AI ASSISTANT
// ==========================================

let lastProduct = null;


// ==========================================
// NORMALIZE TEXT
// ==========================================

function normalizeText(text) {

    return text
        .toLowerCase()
        .replace(/[^\w\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}


// ==========================================
// FIND PRODUCT
// ==========================================

function findProduct(message) {

    let text = normalizeText(message);

    let bestProduct = null;
    let bestScore = 0;

    for (let item of bisKnowledgeBase) {

        let score = 0;

        // Exact product name
        let productName = normalizeText(item.product);

        if (text.includes(productName)) {
            score = 1000 + productName.length;
        }

        // Keywords
        for (let keyword of item.keywords) {

            let key = normalizeText(keyword);

            if (text.includes(key)) {

                // Longer keyword = more specific match
                let keywordScore = 100 + key.length;

                score = Math.max(score, keywordScore);
            }
        }

        if (score > bestScore) {

            bestScore = score;
            bestProduct = item;

        }
    }

    return bestProduct;
}


// ==========================================
// CHECK PREVIOUS PRODUCT REFERENCE
// ==========================================

function refersToPreviousProduct(message) {

    let text = normalizeText(message);

    let references = [

        "this product",
        "that product",
        "the product",
        "this",
        "it",
        "idhu",
        "idhuku",
        "idhukku",
        "intha product",
        "andha product"

    ];

    return references.some(word => text.includes(word));
}


// ==========================================
// SHOW PRODUCT DETAILS
// ==========================================

function productDetails(product) {

    return `

        <strong>📋 Product Information</strong>

        <br><br>

        <strong>Product:</strong>
        ${product.title}

        <br><br>

        <strong>IS Standard:</strong>
        ${product.standard}

        <br><br>

        💡 <strong>You can also ask me:</strong>

        <br><br>

        • Is BIS certification required?<br>
        • How can I get BIS certification?<br>
        • What is the certification process?<br>
        • How long does it take?<br>
        • What is the applicable scheme?

    `;
}


// ==========================================
// CERTIFICATION PROCESS
// ==========================================

function certificationProcess(product) {

    let productName = product
        ? product.title
        : "your product";

    let standard = product
        ? product.standard
        : "applicable IS Standard";

    return `

        <strong>📝 BIS Certification Process</strong>

        <br><br>

        <strong>Product:</strong>
        ${productName}

        <br>

        <strong>IS Standard:</strong>
        ${standard}

        <br><br>

        <strong>1️⃣ Identify the Applicable IS Standard</strong>

        <br>

        First, identify the Indian Standard applicable
        to your product.

        <br><br>

        <strong>2️⃣ Prepare Manufacturing & Quality Setup</strong>

        <br>

        Make sure the required manufacturing facilities,
        quality-control arrangements and testing facilities
        are available as applicable.

        <br><br>

        <strong>3️⃣ Product Testing</strong>

        <br>

        The required product samples have to undergo
        applicable testing according to the relevant
        standard and BIS requirements.

        <br><br>

        <strong>4️⃣ Submit Online Application</strong>

        <br>

        Submit the applicable BIS application through
        the online BIS application process.

        <br><br>

        <strong>5️⃣ Factory Inspection / Assessment</strong>

        <br>

        For applicable Scheme-I / ISI Mark cases,
        BIS assessment or factory inspection may be
        carried out.

        <br><br>

        <strong>6️⃣ Scrutiny & Licence Grant</strong>

        <br>

        BIS reviews the application, test results and
        applicable assessment requirements.

        <br><br>

        If the applicable requirements are satisfied,
        the BIS licence / certification process can be
        completed.

        <br><br>

        ⚠️ <strong>Important:</strong>

        Exact requirements depend on the product,
        applicable scheme and Government Quality
        Control Order.

    `;
}


// ==========================================
// CERTIFICATION INFORMATION
// ==========================================

function certificationInformation(product) {

if (!product && !lastProduct) { 

        return `

            <strong>✅ BIS Certification</strong>

            <br><br>

            BIS certification requirements depend on
            the product and applicable regulations.

            <br><br>

            Please tell me the product name.

            <br><br>

            Example:

            <br>

            <strong>
            Is BIS certification required for plywood?
            </strong>

        `;
    }


    if ((product || lastProduct)?.certification) {
         let certProduct = product || lastProduct;

        return `

            <strong>✅ Certification Information</strong>

            <br><br>

            <strong>Product:</strong>
            ${product.title}

            <br><br>

            <strong>IS Standard:</strong>
            ${product.standard}

            <br><br>

            <strong>Certification:</strong>
            ${product.certification}

            <br><br>

            <strong>Scheme:</strong>
            ${product.scheme || "Refer to applicable BIS requirements"}

            <br><br>

            💡<strong>You can also ask me:</strong>

            <br>

            <strong>
            How can I get the BIS certificate?
            </strong>

        `;

    }


    return `

        <strong>📋 Certification Information</strong>

        <br><br>

        <strong>Product:</strong>
        ${product.title}

        <br><br>

        <strong>IS Standard:</strong>
        ${product.standard}

        <br><br>

        ⚠️ The current knowledge base identifies
        the applicable IS Standard, but it does not
        automatically establish compulsory certification
        for every product.

        <br><br>

        The compulsory-certification status should be
        verified against the latest applicable BIS
        requirements / Government Quality Control Order.

        <br><br>

        💡 You can ask:

        <br>

        <strong>
        How can I get the BIS certificate?
        </strong>

    `;
}


// ==========================================
// TIMELINE
// ==========================================

function certificationTimeline() {

    return `

        <strong>⏱️ BIS Certification Processing Time</strong>

        <br><br>

        Processing time can vary depending on the
        product, scheme, testing and application.

        <br><br>

        For applications covered by the Option-2
        procedure mentioned in the provided BIS source,
        the stated aim was processing licence-grant
        applications within <strong>30 days</strong>.

        <br><br>

        ⚠️ This does not mean every BIS application
        will always take exactly 30 days.

    `;
}


// ==========================================
// SEND MESSAGE
// ==========================================

function sendMessage() {

    let input = document.getElementById("userInput");

    let message = input.value.trim();

    if (message === "") {
        return;
    }

    let chatMessages =
        document.getElementById("chatMessages");


    // Show user message

    chatMessages.innerHTML += `

        <div class="user-message">
            ${message}
        </div>

    `;


    input.value = "";


    let text = normalizeText(message);


    // ==========================================
    // FIND PRODUCT
    // ==========================================

    let product = findProduct(message);


   // Remember product

if (product === null) {

    // Use previously mentioned product
    product = lastProduct;

} else {

    // Remember newly detected product
    lastProduct = product;
}


    let response = "";


    // ==========================================
    // 1. GREETING
    // ==========================================

    if (

        text === "hi" ||
        text === "hello" ||
        text === "hey" ||
        text.includes("good morning") ||
        text.includes("good evening")

    ) {

        response = `

            <strong>👋 Hello!</strong>

            <br><br>

            I'm your <strong>BIS AI Assistant</strong>.

            <br><br>

            You can ask me about:

            <br>

            📋 Indian Standards<br>
            🏭 BIS Certification<br>
            🔎 Product Standards<br>
            📝 Certification Process<br>
            ⏱️ Processing Time<br>
            📚 BIS Services

        `;

    }


    // ==========================================
    // 2. WHAT IS BIS?
    // ==========================================

    else if (

        text === "bis" ||
        text.includes("what is bis") ||
        text.includes("bis full form") ||
        text.includes("meaning of bis") ||
        text.includes("about bis")

    ) {

        response = `

            <strong>🏛️ What is BIS?</strong>

            <br><br>

            BIS stands for
            <strong>Bureau of Indian Standards</strong>.

            <br><br>

            BIS is India's national standards body.

            <br><br>

            It develops Indian Standards and provides
            certification and conformity assessment
            services.

        `;

    }


    // ==========================================
// 3. CERTIFICATE PROCESS
// ==========================================

else if (
    text.includes("how to get certificate") ||
    text.includes("how can i get certificate") ||
    text.includes("how to get bis certificate") ||
    text.includes("how can i get bis certificate") ||
    text.includes("certificate process") ||
    text.includes("certification process") ||
    text.includes("how to apply for certification") ||
    text.includes("how to apply for bis") ||
    text.includes("process to get certificate") ||
    text.includes("process for certification") ||
    text.includes("how can i get") ||
    text.includes("how do i get") ||
    text.includes("how i get") ||
    text.includes("how to get") ||
    text.includes("steps to get bis") ||
    text.includes("give me the steps") ||
    text.includes("what are the steps")
) {
    response = certificationProcess(product);
}


// ==========================================
// 3.5. TESTING REQUIREMENTS
// ==========================================

else if (
    text.includes("what testing") ||
    text.includes("which testing") ||
    text.includes("testing required") ||
    text.includes("tests required") ||
    text.includes("what tests") ||
    text.includes("which tests") ||
    text.includes("testing is required")
) {

    if (product !== null) {

        response = `

            <strong>🧪 Testing Requirements</strong>

            <br><br>

            <strong>Product:</strong>
            ${product.title}

            <br><br>

            <strong>IS Standard:</strong>
            ${product.standard}

            <br><br>

            The required testing depends on the applicable
            Indian Standard, product type and BIS
            certification requirements.

            <br><br>

            Testing should be carried out according to
            the applicable BIS standard and prescribed
            requirements.

            <br><br>

            📚 <strong>Verified Source:</strong>
            BIS Standards / Know Your Standard

        `;

    }

    else {

        response = `

            <strong>🧪 Testing Requirements</strong>

            <br><br>

            Please tell me the product name first.

            <br><br>

            Example:

            <br>

            <strong>
            I manufacture ceramic tiles
            </strong>

            <br><br>

            Then ask:

            <br>

            <strong>
            What testing is required for this product?
            </strong>

        `;

    }

}


    // ==========================================
    // 4. CERTIFICATION REQUIRED?
    // ==========================================

    else if (

        text.includes("certification") ||
        text.includes("certified") ||
        text.includes("compulsory") ||
        text.includes("mandatory") ||
        text.includes("necessary") ||
        text.includes("required") ||
        text.includes("license") ||
        text.includes("licence")

    ) {

        response = certificationInformation(product);

    }


    // ==========================================
    // 5. STANDARD QUESTION
    // ==========================================

    else if (

        text.includes("is number") ||
        text.includes("is code") ||
        text.includes("is standard") ||
        text.includes("which standard") ||
        text.includes("applicable standard") ||
        text.includes("applicable is") ||
        text.includes("standard for") ||
        text.includes("standard of") ||
        text.includes("what standard")

    ) {

        if (product !== null) {

            response = `

                <strong>📋 Applicable BIS Standard</strong>

                <br><br>

                <strong>Product:</strong>
                ${product.title}

                <br><br>

                <strong>IS Standard:</strong>
                ${product.standard}

                <br><br>

                🔎 This product-standard mapping
                is available in the current knowledge base.

                <br><br>

                ⚠️ Verify the latest official BIS
                requirements before making a regulatory
                or certification decision.

            `;

        }

        else {

            response = `

                🤔 Please tell me the product name.

                <br><br>

                Example:

                <br>

                <strong>
                What is the IS standard for plywood?
                </strong>

            `;

        }

    }


    // ==========================================
    // 6. APPLY QUESTION
    // ==========================================

    else if (

        text.includes("how to apply") ||
        text.includes("apply for") ||
        text.includes("application process") ||
        text.includes("how can i get") ||
        text.includes("how to get bis") ||
        text.includes("process for bis")

    ) {

        response = certificationProcess(product);

    }


    // ==========================================
    // 7. TIMELINE
    // ==========================================

    else if (

        text.includes("how long") ||
        text.includes("how many days") ||
        text.includes("timeline") ||
        text.includes("time taken") ||
        text.includes("processing time") ||
        text.includes("days") ||
        text.includes("weeks") ||
        text.includes("months")

    ) {

        response = certificationTimeline();

    }


    // ==========================================
    // 8. OPTION-2
    // ==========================================

    else if (

        text.includes("option 2") ||
        text.includes("option-2") ||
        text.includes("simplified procedure") ||
        text.includes("simplified process")

    ) {

        response = `

            <strong>⚡ BIS Option-2</strong>

            <br><br>

            Option-2 refers to the procedure mentioned
            in the provided BIS source for processing
            certain product certification applications.

            <br><br>

            The source states that the measure was
            introduced for domestic industry, including
            MSMEs, with the aim of processing licence-grant
            applications within <strong>30 days</strong>.

            <br><br>

            ⚠️ The provided product list should not be
            treated as a complete statement of all current
            BIS certification rules.

        `;

    }


    // ==========================================
    // 9. PRODUCT FOUND
    // ==========================================

    else if (product !== null) {

        response = productDetails(product);

    }


    // ==========================================
    // 10. UNKNOWN QUESTION
    // ==========================================

    else {

        response = `

            <strong>🤔 I can help with BIS information.</strong>

            <br><br>

            I couldn't identify the product or BIS topic
            from your question.

            <br><br>

            Try:

            <br><br>

            🔹 What is the IS standard for plywood?

            <br>

            🔹 Is BIS certification required for plywood?

            <br>

            🔹 How can I get the BIS certificate?

            <br>

            🔹 What is the certification process?

            <br>

            🔹 How long does BIS certification take?

            <br>

            🔹 What is BIS?

        `;

    }


    // ==========================================
    // SHOW BOT RESPONSE
    // ==========================================

    setTimeout(() => {

        chatMessages.innerHTML += `

            <div class="bot-message">
                ${response}
            </div>

        `;

        chatMessages.scrollTop =
            chatMessages.scrollHeight;

    }, 500);

}


// ==========================================
// SUGGESTED QUESTION BUTTON
// ==========================================

function askQuestion(question) {

    let input =
        document.getElementById("userInput");

    input.value = question;

    sendMessage();

}