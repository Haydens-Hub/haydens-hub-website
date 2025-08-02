export function renderRichText(richTextObj, findAssetById) {
  if (!richTextObj || !richTextObj.content) return "";

  return richTextObj.content
    .map((block) => {
      switch (block.nodeType) {
        case "paragraph":
          return `<p class="mb-4">${renderInline(block.content)}</p>`;

        case "heading-1":
          return `<h1 class="text-3xl font-bold mb-4">${renderInline(block.content)}</h1>`;
        case "heading-2":
          return `<h2 class="text-2xl font-semibold mb-4">${renderInline(block.content)}</h2>`;
        case "heading-3":
          return `<h3 class="text-xl font-semibold mb-4">${renderInline(block.content)}</h3>`;
        case "heading-4":
          return `<h4 class="text-lg font-semibold mb-3">${renderInline(block.content)}</h4>`;

        case "unordered-list":
          return `<ul class="list-disc pl-6 mb-4">
            ${block.content.map((item) => `<li>${renderInline(item.content[0].content)}</li>`).join("")}
          </ul>`;

        case "ordered-list":
          return `<ol class="list-decimal pl-6 mb-4">
            ${block.content.map((item) => `<li>${renderInline(item.content[0].content)}</li>`).join("")}
          </ol>`;

        case "blockquote":
          return `<blockquote class="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-4">
            ${block.content.map((b) => renderRichText({ content: [b] }, findAssetById)).join("")}
          </blockquote>`;

        case "embedded-asset-block": {
          const assetId = block.data.target.sys.id;
          const asset = findAssetById(assetId);
          if (!asset || !asset.fields?.file?.url) return "";
          const imageUrl = asset.fields.file.url.startsWith("//")
            ? `https:${asset.fields.file.url}`
            : asset.fields.file.url;
          const description = asset.fields.description || "Image";
          return `<div class="my-6">
            <img src="${imageUrl}" alt="${description}" class="rounded-md w-full max-w-3xl mx-auto shadow-md" loading="lazy"/>
          </div>`;
        }

        default:
          return "";
      }
    })
    .join("");
}

function renderInline(content) {
  return content
    .map((node) => {
      if (node.nodeType === "text") {
        let text = node.value;
        node.marks?.forEach((mark) => {
          switch (mark.type) {
            case "bold":
              text = `<strong>${text}</strong>`; break;
            case "italic":
              text = `<em>${text}</em>`; break;
            case "underline":
              text = `<u>${text}</u>`; break;
            case "code":
              text = `<code class="bg-gray-800 text-white px-1 py-0.5 rounded">${text}</code>`; break;
          }
        });
        return text;
      }

      if (node.nodeType === "hyperlink") {
        const url = node.data.uri;
        const linkText = renderInline(node.content);
        return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline">${linkText}</a>`;
      }

      return "";
    })
    .join("");
}
