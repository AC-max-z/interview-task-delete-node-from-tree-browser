/**
 * Test cases for node removal from tree
 *
 * (assuming that all subtree of node descendants is removed as well,
 *  instead of descendants being reassigned to parent of deleted node,
 *  given the nature of provided example.
 *  Otherwise, we should check that descendants nodes are still present in tree and their parent node
 *  is changed to deleted node parent)
 *
 * 1. Remove root node -> verify tree is empty (not present in DOM?)
 * 2. Remove node with descendants
 *    (with various depth levels, e.g. delete 'Coffee', delete 'Green Tea') ->
 *      verify node is not present in DOM,
 *      verify descendants are not present in DOM,
 *      verify edgesCount = initialEdgesCount - deletedNodeDescendantsCount - 1
 * 3. Remove leaf -> verify leaf is not present in DOM, verify edgesCount = initialEdgesCount - 1
 * 4. Remove non existent node -> verify tree is the same as initial
 */

/**
 * Test example
 */
async function someTest(beverageName) {
    const browser = getBrowser();
    const page = new Page(browser);
    await page.goTo();
    const initialBeverages = await page.getBeverages();
    const initilBeveragesEdges = initialBeverages.getEdgesCount();
    const descendantsCount =
        initialBeverages.getNodeDescendantsCount(beverageName);
    await page.deleteBeverageWithTitle(beverageName);
    const updatedBeverages = await page.getBeverages();
    expect(updatedBeverages.findBeverage(beverageName)).to.be.null;
    expect(updatedBeverages.getEdgesCount()).to.be.equal(
        initilBeveragesEdges - descendantsCount - 1
    );
}

/**
 * waiting for elements in pure js
 */
async function waitForElement(selector, timeout = 5000, interval = 100) {
    const endTime = Date.now() + timeout;
    while (Date.now() < endTime) {
        const element = document.querySelector(selector);
        if (element) return element;
        await new Promise(resolve => setTimeout(resolve, interval));
    }
    throw new Error(
        `Element with selector "${selector}" not found within ${timeout}ms`
    );
}
