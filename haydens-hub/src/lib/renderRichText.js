function getPlainText(content) {
  return content
    .map((node) => {
      if (node.nodeType === "text") return node.value;
      if (node.content) return getPlainText(node.content); // recurse
      return "";
    })
    .join("")
    .trim();
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function renderRichText(richTextObj, findAssetById, slugMap = {}) {
  if (!richTextObj || !richTextObj.content) return "";

  return richTextObj.content
    .map((block) => {
      switch (block.nodeType) {
        case "paragraph":
          return `<p class="mb-4">${renderInline(block.content)}</p>`;

        case "heading-1":
        case "heading-2":
        case "heading-3":
        case "heading-4": {
          const plainText = getPlainText(block.content);
          const contentfulSlug = slugMap[plainText.trim()] || slugify(plainText);

          const tag = block.nodeType === "heading-1" ? "h1" :
            block.nodeType === "heading-2" ? "h2" :
              block.nodeType === "heading-3" ? "h3" : "h4";

          const className =
            block.nodeType === "heading-1" ? "text-3xl mb-4 font-bold" :
              block.nodeType === "heading-2" ? "text-2xl mb-4 font-semibold" :
                block.nodeType === "heading-3" ? "text-xl mb-4 font-semibold" :
                  "text-lg mb-3 font-semibold";

          return `<${tag} id="${contentfulSlug}" class="${className}">${renderInline(block.content)}</${tag}>`;
        }

        case "unordered-list":
          return `<ul class="list-disc pl-6 mb-4">
            ${block.content
              .map((item) => `<li>${renderInline(item.content[0].content)}</li>`)
              .join("")}
          </ul>`;

        case "ordered-list":
          return `<ol class="list-decimal pl-6 mb-4">
            ${block.content
              .map((item) => `<li>${renderInline(item.content[0].content)}</li>`)
              .join("")}
          </ol>`;

        case "blockquote":
          return `<blockquote class="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-4">
            ${block.content
              .map((b) => renderRichText({ content: [b] }, findAssetById, slugMap))
              .join("")}
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

        case "hr":
          return `<hr class="my-6 border-gray-300"/>`;

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
            case "bold": text = `<strong>${text}</strong>`; break;
            case "italic": text = `<em>${text}</em>`; break;
            case "underline": text = `<u>${text}</u>`; break;
            case "code": text = `<code class="bg-gray-800 text-white px-1 py-0.5 rounded">${text}</code>`; break;
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
