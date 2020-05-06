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
		return (a, b) => Math.exp(hypoHyper(n-1)(Math.log(a), Math.log(b)));
	return (a, b) => Math.log(hypoHyper(n+1)(Math.exp(a), Math.exp(b)));
}

class AbstractError extends Error {
	/** @param {string} [message] */
	constructor(message){
		super(message)
	}
}

class LambdaComponent {
	constructor(){
		if (this.constructor === LambdaComponent)
			throw AbstractError;
    }
	/** @param {LambdaComponent} other
	 * @returns {boolean}
	*/
	equals(other){
		throw AbstractError;
	}
}

class LambdaVariable extends LambdaComponent {
	constructor(){
		super();
		this.id = +new Date();
	}
	/** @param {LambdaVariable} other */
	equals(other){
		return other instanceof LambdaVariable && this.id === other.id;
	}
}

class LambdaApplication extends LambdaComponent {
	/**
	 * @param {LambdaComponent} left 
	 * @param {LambdaComponent} right 
	 */
	constructor(left, right){
		super();
		this.left = left;
		this.right = right;
	}
	/** @param {LambdaApplication} other */
	equals(other){
		return other instanceof LambdaApplication &&
			this.left === other.left &&
			this.right === other.right;
	}
}

class Lambda extends LambdaComponent {
	/**
	 * @param {LambdaComponent} input 
	 * @param {LambdaComponent} ouput 
	 */
	constructor(input, ouput){
		super();
		this.input = input;
		this.ouput = ouput;
	}
	/** @param {Lambda} other */
	equals(other){
		return other instanceof Lambda &&
			this.input === other.input &&
			this.ouput === other.ouput;
	}
}

const church = {
	true: x => y => x,
	false: x => y => y,
};