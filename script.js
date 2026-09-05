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

        let productName =
            normalizeText(item.product);

        // Exact product name
        if (text.includes(productName)) {

            score =
                1000 + productName.length;

        }

        // Keywords
        for (let keyword of item.keywords) {

            let key =
                normalizeText(keyword);

            if (text.includes(key)) {

                let keywordScore =
                    100 + key.length;

                score =
                    Math.max(score, keywordScore);
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

    let text =
        normalizeText(message);

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

    return references.some(word =>
        text.includes(word)
    );
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
        • What testing is required?<br>
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

        First, identify the Indian Standard
        applicable to your product.

        <br><br>

        <strong>2️⃣ Prepare Manufacturing & Quality Setup</strong>

        <br>

        Make sure the required manufacturing
        facilities, quality-control arrangements
        and testing facilities are available
        as applicable.

        <br><br>

        <strong>3️⃣ Product Testing</strong>

        <br>

        The required product samples have to
        undergo applicable testing according to
        the relevant standard and BIS requirements.

        <br><br>

        <strong>4️⃣ Submit Online Application</strong>

        <br>

        Submit the applicable BIS application
        through the online BIS application process.

        <br><br>

        <strong>5️⃣ Factory Inspection / Assessment</strong>

        <br>

        For applicable Scheme-I / ISI Mark cases,
        BIS assessment or factory inspection may
        be carried out.

        <br><br>

        <strong>6️⃣ Scrutiny & Licence Grant</strong>

        <br>

        BIS reviews the application, test results
        and applicable assessment requirements.

        <br><br>

        If the applicable requirements are satisfied,
        the BIS licence / certification process
        can be completed.

        <br><br>

        ⚠️ <strong>Important:</strong>

        <br>

        Exact requirements depend on the product,
        applicable scheme and Government Quality
        Control Order.

    `;
}


// ==========================================
// CERTIFICATION INFORMATION
// ==========================================

function certificationInformation(product) {

    let certProduct =
        product || lastProduct;

    if (!certProduct) {

        return `

            <strong>✅ BIS Certification</strong>

            <br><br>

            BIS certification requirements depend
            on the product and applicable regulations.

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


    if (certProduct.certification) {

        return `

            <strong>✅ Certification Information</strong>

            <br><br>

            <strong>Product:</strong>
            ${certProduct.title}

            <br><br>

            <strong>IS Standard:</strong>
            ${certProduct.standard}

            <br><br>

            <strong>Certification:</strong>
            ${certProduct.certification}

            <br><br>

            <strong>Scheme:</strong>
            ${certProduct.scheme ||
            "Refer to applicable BIS requirements"}

            <br><br>

            💡 <strong>You can also ask me:</strong>

            <br><br>

            How can I get the BIS certificate?

        `;
    }


    return `

        <strong>📋 Certification Information</strong>

        <br><br>

        <strong>Product:</strong>
        ${certProduct.title}

        <br><br>

        <strong>IS Standard:</strong>
        ${certProduct.standard}

        <br><br>

        ⚠️ The current knowledge base identifies
        the applicable IS Standard, but it does not
        automatically establish compulsory
        certification for every product.

        <br><br>

        The compulsory-certification status should
        be verified against the latest applicable
        BIS requirements / Government Quality
        Control Order.

        <br><br>

        💡 You can ask:

        <br><br>

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
// BIS PORTAL TROUBLESHOOTER
// ==========================================

function bisPortalTroubleshooter(text) {


    // ==========================================
    // FILE / UPLOAD ISSUE
    // ==========================================

    if (
        text.includes("invalid file") ||
        text.includes("file format") ||
        text.includes("upload error")
    ) {

        return `

            <strong>
            📄 BIS Portal – File / Upload Issue
            </strong>

            <br><br>

            The portal may reject a file when it
            does not match the upload requirements
            or when the file cannot be read correctly.

            <br><br>

            <strong>What to check:</strong>

            <br><br>

            • Check the file format and size
            requirements shown on the application page.

            <br>

            • Make sure the file opens normally
            on your computer.

            <br>

            • If the file appears corrupted,
            re-save or re-export it and try again.

            <br>

            • If the issue continues, use the
            official BIS support / complaint route.

            <br><br>

            🔗
            <a href="https://www.bis.gov.in/?lang=en"
            target="_blank">

            Official BIS Website

            </a>

        `;
    }


    // ==========================================
    // PAYMENT ISSUE
    // ==========================================

    if (
        text.includes("payment failed") ||
        text.includes("money deducted") ||
        text.includes("payment problem") ||
        text.includes("payment issue")
    ) {

        return `

            <strong>
            💳 BIS Portal – Payment Issue
            </strong>

            <br><br>

            If payment failed but money was deducted,
            first verify the payment and application
            status before making another payment.

            <br><br>

            <strong>What to do:</strong>

            <br><br>

            • Check the application / transaction status.

            <br>

            • Keep your application number and
            transaction details.

            <br>

            • Avoid making a second payment until
            the first transaction status is confirmed.

            <br>

            • If the issue remains unresolved,
            contact BIS through the official support
            or complaint route.

            <br><br>

            🔗
            <a href="https://www.bis.gov.in/directory/enquiry/?lang=en"
            target="_blank">

            BIS Enquiry

            </a>

        `;
    }


    // ==========================================
    // BLANK PAGE
    // ==========================================

    if (
        text.includes("blank page") ||
        text.includes("page went blank") ||
        text.includes("submit but") ||
        text.includes("submit button")
    ) {

        return `

            <strong>
            🖥️ BIS Portal – Blank Page After Submit
            </strong>

            <br><br>

            A blank page by itself does not confirm
            that your application was successfully
            submitted.

            <br><br>

            <strong>Check these first:</strong>

            <br><br>

            • Check your application dashboard
            / status.

            <br>

            • Look for an application or transaction
            reference number.

            <br>

            • Check whether BIS sent any email
            or notification.

            <br>

            • Avoid submitting the same application
            again until the status is confirmed.

            <br><br>

            If the status is still unclear, use the
            official BIS support route.

        `;
    }


    // ==========================================
    // IS CODE INVALID
    // ==========================================

    if (
        text.includes("is code invalid") ||
        text.includes("standard code invalid") ||
        text.includes("invalid is code")
    ) {

        return `

            <strong>
            🔎 BIS Portal – IS Code Validation Issue
            </strong>

            <br><br>

            First verify that you have entered the
            correct Indian Standard number for
            the product.

            <br><br>

            <strong>What to check:</strong>

            <br><br>

            • Verify the IS number from official
            BIS information.

            <br>

            • Check that the standard matches
            your product.

            <br>

            • Enter the number in the format
            requested by the portal.

            <br>

            • If the correct standard is still
            rejected, contact BIS support.

            <br><br>

            🔗
            <a href="https://standards.bis.gov.in/"
            target="_blank">

            BIS Standards Portal

            </a>

        `;
    }


    // ==========================================
    // CLARIFICATION / SCRUTINY
    // ==========================================

    if (
        text.includes("clarification raised") ||
        text.includes("scrutiny") ||
        text.includes("clarification")
    ) {

        return `

            <strong>
            📋 BIS Application – Clarification / Scrutiny
            </strong>

            <br><br>

            A clarification or scrutiny observation
            generally means that BIS requires
            additional information, documents,
            or corrective action for the application.

            <br><br>

            <strong>What to do:</strong>

            <br><br>

            • Read the exact observation shown
            in your application.

            <br>

            • Identify the document or information
            requested.

            <br>

            • Provide the required clarification
            through the application workflow.

            <br>

            • Keep a copy of the submitted
            clarification for your records.

            <br><br>

            The exact requirement can depend on
            the applicable BIS scheme.

        `;
    }


    // ==========================================
    // APPLICATION STATUS / DELAY
    // ==========================================

    if (
        text.includes("status stuck") ||
        text.includes("application delay") ||
        text.includes("status not changed") ||
        text.includes("application status")
    ) {

        return `

            <strong>
            ⏳ BIS Application – Status / Delay
            </strong>

            <br><br>

            If your application status has not changed
            for some time, first check whether any
            clarification, document, fee, testing,
            or other action is pending.

            <br><br>

            <strong>What to do:</strong>

            <br><br>

            • Note your application number.

            <br>

            • Check the latest status shown
            on the portal.

            <br>

            • Check whether BIS has requested
            any additional information.

            <br>

            • If there is no clear update, contact
            the appropriate BIS office / enquiry channel.

            <br><br>

            🔗
            <a href="https://www.bis.gov.in/directory/enquiry/?lang=en"
            target="_blank">

            BIS Enquiry

            </a>

        `;
    }


    // ==========================================
    // COMPLAINT / ESCALATION
    // ==========================================

    if (
        text.includes("complaint") ||
        text.includes("escalate") ||
        text.includes("how can i complain")
    ) {

        return `

            <strong>
            📞 BIS Complaint / Escalation
            </strong>

            <br><br>

            BIS provides official channels for
            registering complaints and getting
            assistance.

            <br><br>

            <strong>You can use:</strong>

            <br><br>

            • BIS CARE / Standard Promotion Portal

            <br>

            • Nearest BIS Regional or Branch Office

            <br>

            • Email: complaints@bis.gov.in

            <br>

            • BIS enquiry contact

            <br><br>

            📞 General complaint contact:
            +91-11-23235069

            <br><br>

            🔗
            <a href="https://www.bis.gov.in/consumer-overview/online-complaint-registration/?lang=en"
            target="_blank">

            Online Complaint Registration

            </a>

        `;
    }


    return null;
}


// ==========================================
// TROUBLESHOOTER MENU
// ==========================================

function troubleshooterMenu() {

    return `

        <strong>
        🛠️ BIS Portal Troubleshooter
        </strong>

        <br><br>

        I can help you understand common
        BIS portal issues.

        <br><br>

        <strong>
        📄 Document / File Issue
        </strong>

        <br>

        • Why am I getting an invalid file
        format error?

        <br><br>

        <strong>
        💳 Payment Issue
        </strong>

        <br>

        • My payment failed but money was
        deducted. What should I do?

        <br><br>

        <strong>
        📋 Application Issue
        </strong>

        <br>

        • What does an application
        clarification mean?

        <br><br>

        <strong>
        ⏳ Status / Delay
        </strong>

        <br>

        • My application status is stuck.
        What should I do?

        <br><br>

        <strong>
        📞 Complaint
        </strong>

        <br>

        • How can I check or escalate
        my complaint?

    `;
}


// ==========================================
// SEND MESSAGE
// ==========================================

function sendMessage() {

    let input =
        document.getElementById("userInput");

    let message =
        input.value.trim();

    if (message === "") {
        return;
    }


    let chatMessages =
        document.getElementById("chatMessages");


    // ==========================================
    // SHOW USER MESSAGE
    // ==========================================

    chatMessages.innerHTML += `

        <div class="user-message">
            ${message}
        </div>

    `;


    input.value = "";


    let text =
        normalizeText(message);


    // ==========================================
    // FIND PRODUCT
    // ==========================================

    let product =
        findProduct(message);


    // ==========================================
    // PRODUCT MEMORY
    // ==========================================

    if (product !== null) {

        lastProduct = product;

    }
    else if (
        refersToPreviousProduct(message)
    ) {

        product = lastProduct;

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

            I'm your
            <strong>BIS AI Assistant</strong>.

            <br><br>

            You can ask me about:

            <br><br>

            📋 Indian Standards<br>
            🏭 BIS Certification<br>
            🔎 Product Standards<br>
            📝 Certification Process<br>
            🧪 Testing Requirements<br>
            ⏱️ Processing Time<br>
            📚 BIS Services<br>
            🛠️ BIS Portal Troubleshooting

        `;

    }


    // ==========================================
    // 2. PORTAL TROUBLESHOOTER
    // ==========================================

    else if (

        text.includes("troubleshooter") ||
        text.includes("portal issue") ||
        text.includes("portal problem") ||
        text.includes("website issue") ||
        text.includes("website problem") ||
        text.includes("invalid file") ||
        text.includes("file format") ||
        text.includes("upload error") ||
        text.includes("payment failed") ||
        text.includes("money deducted") ||
        text.includes("payment problem") ||
        text.includes("payment issue") ||
        text.includes("blank page") ||
        text.includes("page went blank") ||
        text.includes("is code invalid") ||
        text.includes("invalid is code") ||
        text.includes("standard code invalid") ||
        text.includes("clarification raised") ||
        text.includes("scrutiny") ||
        text.includes("application delay") ||
        text.includes("status stuck") ||
        text.includes("status not changed") ||
        text.includes("application status") ||
        text.includes("complaint") ||
        text.includes("escalate")

    ) {

        response =
            bisPortalTroubleshooter(text);

        if (!response) {

            response =
                troubleshooterMenu();

        }

    }


    // ==========================================
    // 3. WHAT IS BIS?
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
            <strong>
            Bureau of Indian Standards
            </strong>.

            <br><br>

            BIS is India's national standards body.

            <br><br>

            It develops Indian Standards and
            provides certification and conformity
            assessment services.

        `;

    }


    // ==========================================
    // 4. CERTIFICATE PROCESS
    // ==========================================

    else if (

        text.includes("how to get certificate") ||
        text.includes("how can i get certificate") ||
        text.includes("how can i get certification") ||
        text.includes("how to get bis certificate") ||
        text.includes("how can i get bis certificate") ||
        text.includes("certificate process") ||
        text.includes("certification process") ||
        text.includes("how to apply for certification") ||
        text.includes("how to apply for bis") ||
        text.includes("process to get certificate") ||
        text.includes("process for certification") ||
        text.includes("steps to get bis") ||
        text.includes("give me the steps") ||
        text.includes("what are the steps")

    ) {

        response =
            certificationProcess(null);

    }


    // ==========================================
    // 5. TESTING REQUIREMENTS
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

                <strong>
                🧪 Testing Requirements
                </strong>

                <br><br>

                <strong>Product:</strong>
                ${product.title}

                <br><br>

                <strong>IS Standard:</strong>
                ${product.standard}

                <br><br>

                The required testing depends on
                the applicable Indian Standard,
                product type and BIS certification
                requirements.

                <br><br>

                Testing should be carried out according
                to the applicable BIS standard and
                prescribed requirements.

                <br><br>

                📚 <strong>Verified Source:</strong>
                BIS Standards / Know Your Standard

            `;

        }
        else {

            response = `

                <strong>
                🧪 Testing Requirements
                </strong>

                <br><br>

                Please tell me the product name first.

                <br><br>

                Example:

                <br><br>

                <strong>
                I manufacture ceramic tiles
                </strong>

                <br><br>

                Then ask:

                <br><br>

                <strong>
                What testing is required for this product?
                </strong>

            `;

        }

    }


    // ==========================================
    // 6. CERTIFICATION REQUIRED?
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

        response =
            certificationInformation(product);

    }


    // ==========================================
    // 7. STANDARD QUESTION
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

                <strong>
                📋 Applicable BIS Standard
                </strong>

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
                requirements before making a
                regulatory or certification decision.

            `;

        }
        else {

            response = `

                🤔 Please tell me the product name.

                <br><br>

                Example:

                <br><br>

                <strong>
                What is the IS standard for plywood?
                </strong>

            `;

        }

    }


    // ==========================================
    // 8. APPLY QUESTION
    // ==========================================

    else if (

        text.includes("how to apply") ||
        text.includes("apply for") ||
        text.includes("application process") ||
        text.includes("how can i get") ||
        text.includes("how do i get") ||
        text.includes("how i get") ||
        text.includes("how to get bis") ||
        text.includes("process for bis")

    ) {

        response =
            certificationProcess(product);

    }


    // ==========================================
    // 9. TIMELINE
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

        response =
            certificationTimeline();

    }


    // ==========================================
    // 10. OPTION-2
    // ==========================================

    else if (

        text.includes("option 2") ||
        text.includes("option-2") ||
        text.includes("simplified procedure") ||
        text.includes("simplified process")

    ) {

        response = `

            <strong>
            ⚡ BIS Option-2
            </strong>

            <br><br>

            Option-2 refers to the procedure
            mentioned in the provided BIS source
            for processing certain product
            certification applications.

            <br><br>

            The source states that the measure
            was introduced for domestic industry,
            including MSMEs, with the aim of
            processing licence-grant applications
            within <strong>30 days</strong>.

            <br><br>

            ⚠️ The provided product list should
            not be treated as a complete statement
            of all current BIS certification rules.

        `;

    }


    // ==========================================
    // 11. PRODUCT FOUND
    // ==========================================

    else if (product !== null) {

        response =
            productDetails(product);

    }


    // ==========================================
    // 12. UNKNOWN QUESTION
    // ==========================================

    else {

        response = `

            <strong>
            🤔 I can help with BIS information.
            </strong>

            <br><br>

            I couldn't identify the product or
            BIS topic from your question.

            <br><br>

            Try:

            <br><br>

            🔹 What is the IS standard for plywood?

            <br><br>

            🔹 Is BIS certification required for plywood?

            <br><br>

            🔹 How can I get the BIS certificate?

            <br><br>

            🔹 What is the certification process?

            <br><br>

            🔹 What testing is required?

            <br><br>

            🔹 How long does BIS certification take?

            <br><br>

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


        // Scroll inside chatbot
        chatMessages.scrollTop =
            chatMessages.scrollHeight;


        // Scroll page to latest answer
        let botMessages =
            chatMessages.querySelectorAll(
                ".bot-message"
            );


        let latestBotMessage =
            botMessages[
                botMessages.length - 1
            ];


        if (latestBotMessage) {

            latestBotMessage.scrollIntoView({

                behavior: "smooth",

                block: "center"

            });

        }

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
function showTroubleshooting() {

    let problems = document.getElementById("commonProblems");

    problems.classList.add("show");

    setTimeout(() => {
        problems.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }, 100);
}
document.getElementById("userInput").addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }

});