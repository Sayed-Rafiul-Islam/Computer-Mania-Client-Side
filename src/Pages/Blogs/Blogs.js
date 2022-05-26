import React from 'react';

const Blogs = () => {
    return (
        <div className='lg:mt-36 mt-12'>
            <div className='bg-success-content lg:mx-12 lg:my-8 m-3 text-left p-8 rounded-lg border border-primary'>
                <h1 className='text-2xl text-primary'>1. How will you improve the performance of a React Application?</h1>
                <i>Whenever I have to write same code twice or more, I create a custom hook, in this way my react app becomes more efficient. When I use an image I compress it first thus it takes less time to render it. Using the Profiler in the reactDevT tool, we are able to know if there is room for improvement and work it out.</i>
            </div>
            <div className='bg-success-content lg:mx-12 lg:my-8 m-3 text-left p-8 rounded-lg border border-primary'>
                <h1 className='text-2xl text-primary'>2. What are the different ways to manage a state in a React application?</h1>
                <i>There are many ways to manage a state in react. The setState() allows us to update a variable's values and any function that may require that value in that local component is able to access it. Another state if Global State. These states can be accessed from any component in the app and so we don't need to duplicate any code over and over again.</i>
            </div>
            <div className='bg-success-content lg:mx-12 lg:my-8 m-3 text-left p-8 rounded-lg border border-primary'>
                <h1 className='text-2xl text-primary'>3. How does prototypical inheritance work?</h1>
                <i>Prototypical inheritance means the ability to access object properties from another ob Then we tell Java script to inherit properties from the prototype. It allows us to reuse properties and methods. dThe Object.prototype is on top of the prototype inheritance chain. Date objects, Array objects, and Player objects all inherit from Object.prototype.</i>
            </div>
            <div className='bg-success-content lg:mx-12 lg:my-8 m-3 text-left p-8 rounded-lg border border-primary'>
                <h1 className='text-2xl text-primary'>4. Why you do not set the state directly in React. For example, if you have const [products, setProducts] = useState([]). Why you do not set products = [...] instead, you use the setProducts</h1>
                <i>It's because when we work on a project or try to solve a problem, the variables scopes are not always global. When we use a function inside another function, sometimes are required to return more than one value and or set a variable somehow in the global scope. If we try to normally set that data, it becomes really difficult sometimes but setState() allows us to do it very easily and and we are able to solve our problems in less time and with more efficiency</i>
            </div>
            <div className='bg-success-content lg:mx-12 lg:my-8 m-3 text-left p-8 rounded-lg border border-primary'>
                <h1 className='text-2xl text-primary'>5. You have an array of products. Each product has a name, price, description, etc. How will you implement a search to find products by name?  </h1>
                <i>I will use filter method on products array and thus it will run a loop on all the products and I will compare the name of every product with the searchName. The product for which this condition is true, that is the product I was supposed to find</i>
            </div>
            <div className='bg-success-content lg:mx-12 lg:my-8 m-3 text-left p-8 rounded-lg border border-primary'>
                <h1 className='text-2xl text-primary'>6. What is a unit test? Why should write unit tests?</h1>
                <i></i>
            </div>
        </div>
    );
};

export default Blogs;