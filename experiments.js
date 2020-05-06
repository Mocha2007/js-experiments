/** My "hypo/hyper" operator
 * @param {number} n integer
 * @return {(a: number, b: number) => number}
 */
function hypoHyper(n){
	if (n % 1)
		throw RangeError;
	if (n === 0)
		return (a, b) => a+b;
	if (n === 1)
		return (a, b) => a*b;
	if (1 < n)
		return (a, b) => Math.exp(h(n-1)(Math.log(a), Math.log(b)));
	return (a, b) => Math.log(h(n+1)(Math.exp(a), Math.exp(b)));
}