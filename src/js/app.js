(function() {

	/*
	 * @info `wp_api_url` is used to pull post data via WordPress API.
	 */
	var wp_api_url = 'https://admin.insights.ubuntu.com/wp-json/wp/v2/posts?per_page=3&page=1&_embed=True';

	/*
	 * @info Creating a view application and attaching it to `#blog`.
	 */
	new Vue({
	    el: '#blog',
	    created() {
	        this.query_api();	
	    },
	    data: {
	        posts: []
	    },
	    methods: {
	    	/* 
	    	 * @info Using Axios to request WP API data.
	    	 */
	        query_api() {
		        axios.get(wp_api_url).then(response => {

		        	/*
		        	 * @info Map each post item to return a structure post object.
		        	 */
	            	this.posts = response.data.map(post => {

	            		return {
	            			title: post.title.rendered,
	            			link: post.link,
	            			thumbnail: {
	            				image: post._embedded['wp:featuredmedia'][0].source_url,
	            				alt_text: post._embedded['wp:featuredmedia'][0].alt_text
	            			},
	            			date: moment(post.date).format('DD MMMM YYYY'),
	            			author: {
	            				name: post._embedded.author[0].name,
	            				link: post._embedded.author[0].link
	            			}
	            		}

	            	});
	            });
	        }
	    }
	});

})();