export const getArticlesSchema = {
	'$id': 'getArticles', 
	'type': 'object',
	'required': [
		'success',
		'data'
	],
	'properties': {
		'success': {
			'$id': '#root/success', 
			'title': 'Success', 
			'type': 'boolean',
			'examples': [
				true
			],
			'default': true
		},
		'data': {
			'$id': '#root/data', 
			'title': 'Data', 
			'type': 'array',
			'default': [],
			'items':{
				'$id': '#root/data/items', 
				'title': 'Items', 
				'type': 'object',
				'required': [
					'_id',
					'backgroundImage',
					'author',
					'category',
					'language',
					'url',
					'title',
					'body',
					'article_id'
				],
				'properties': {
					'_id': {
						'$id': '#root/data/items/_id', 
						'title': '_id', 
						'type': 'string',
						'default': '',
						'examples': [
							'615e1496cf6f670d5d338a93'
						],
						'pattern': '^.*$'
					},
					'backgroundImage': {
						'$id': '#root/data/items/backgroundImage', 
						'title': 'Backgroundimage', 
						'type': 'string',
						'default': '',
						'examples': [
							'https://i-cdn.phonearena.com/images/article/104071-two_lead/Just-for-you-Here-are-10-paid-iOS-apps-free-for-a-limited-time.jpg'
						],
						'pattern': '^.*$'
					},
					'author': {
						'$id': '#root/data/items/author', 
						'title': 'Author', 
						'type': 'string',
						'default': '',
						'examples': [
							'Summer Hills'
						],
						'pattern': '^.*$'
					},
					'category': {
						'$id': '#root/data/items/category', 
						'title': 'Category', 
						'type': 'string',
						'default': '',
						'examples': [
							'General'
						],
						'pattern': '^.*$'
					},
					'language': {
						'$id': '#root/data/items/language', 
						'title': 'Language', 
						'type': 'string',
						'default': '',
						'examples': [
							'Swift'
						],
						'pattern': '^.*$'
					},
					'url': {
						'$id': '#root/data/items/url', 
						'title': 'Url', 
						'type': 'string',
						'default': '',
						'examples': [
							'https://qa-library-dev.herokuapp.com/qa-dashboard'
						],
						'pattern': '^.*$'
					},
					'title': {
						'$id': '#root/data/items/title', 
						'title': 'Title', 
						'type': 'string',
						'default': '',
						'examples': [
							'How to sand a hippo'
						],
						'pattern': '^.*$'
					},
					'body': {
						'$id': '#root/data/items/body', 
						'title': 'Body', 
						'type': 'string',
						'default': '',
						'examples': [
							'Et dolor quis quae explicabo minima. Qui qui sed modi totam neque odit.'
						],
						'pattern': '^.*$'
					},
					'article_id': {
						'$id': '#root/data/items/article_id', 
						'title': 'Article_id', 
						'type': 'integer',
						'examples': [
							1000
						],
						'default': 0
					}
				}
			}

		}
	}
};
