/**
 * div要素のdata-code-loader属性を持つ要素を検索し、別ファイルのコードを読み込む関数。
 */
const codeLoader = () => {
    const ATTR_NAME = 'data-code-src';

    /**
     * コードを読み込む処理。
     * @param string filepath 読み込むコードのファイルパス。
     * @return Promise<string> 読み込んだコードのテキストを解決するPromise。
     */
    const loadCode = async (filepath) => {
        try {
            const response = await fetch(filepath);
            if (!response.ok) {
                throw new Error(`Failed to load code from ${filepath}: ${response.statusText}`);
            }
            return await response.text();
        } catch (error) {
            throw new Error(`Error fetching code from ${filepath}: ${error.message}`);
        }
    };

    /**
     * メイン処理。
     */
    const main = async () => {
        // data-code-src属性を持つ要素を検索する。
        const codeElements = document.querySelectorAll(`[${ATTR_NAME}]`);

        for (const element of codeElements) {
            const filePath = element.getAttribute(ATTR_NAME);
            try {
                const result = await loadCode(filePath);
                element.innerHTML = result;
            } catch (error) {
                console.error(error.message);
                element.innerHTML = `<p>${error.message}</p>`;
            }
        }
    };

    // 実行
    main();
};

/**
 * DOM読み込み後に実行する処理。
 */
window.document.addEventListener('DOMContentLoaded', () => {
    codeLoader();
});

