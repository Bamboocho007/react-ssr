import App from './App';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Todos from './pages/todos/Todos';

const Routes = [
	{
		component: App,
		routes: [
            {
                path: "/",
                exact: true,
                component: Home
            },
            {
                path: "/about",
                component: About,
            },
            {
                path: "/todos",
                component: Todos,
            }
		]
	}
];

export default Routes;
