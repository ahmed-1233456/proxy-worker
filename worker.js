export default {
    async fetch(request) {
        let url = new URL(request.url);
        let targetURL = url.searchParams.get("url");

        if (!targetURL) {
            return new Response("❌ Error: No URL provided!", { status: 400 });
        }

        try {
            let response = await fetch(targetURL, {
                method: request.method,
                headers: request.headers
            });

            let newHeaders = new Headers(response.headers);
            newHeaders.set("Access-Control-Allow-Origin", "*"); // إزالة قيود CORS
            return new Response(response.body, { status: response.status, headers: newHeaders });

        } catch (error) {
            return new Response("⚠️ Server Error: " + error.message, { status: 500 });
        }
    }
}
