import 'whatwg-fetch';
import 'core-js/modules/es6.promise'
import mainStyles from '../css/main.css';
import loadFullImages from './loadImages';
import Router from './router';
import Store from './store';
import ContentView from './contentView';
import TriggersView from './triggersView';
import Controller from './controller';
import { EventBus } from './utils';


loadFullImages();

const eventBus = EventBus(),
			store = Store(),
			contentView = ContentView(),
			triggersView = TriggersView(eventBus),
			controller = Controller(contentView, triggersView, store),
			router = Router();


router
	.add('/', controller)
	.add('cloud-strife', controller)
	.add('tifa-lockhart', controller)
	.add('barret-wallace', controller)
	.bindPopstate()
	.initHistory();

eventBus.on('routeChange', router.onRouteChange.bind(router));
