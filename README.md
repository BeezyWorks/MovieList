# Xamarin Project Journal

#25 January 
Just got the assignment and am looking at the Xamarin website. Journal keeping is not something that comes natural to me, but I'll do my best. Started download... will now go to bed.

#26 January  
All the files have downloaded and I'm ready to get cracking. First thing is to learn a thing or two about C#. I'm assuming it's C based, and I'm quite sure it's object oriented, but that's about it. I'll check with Lynda to see what they have.
I've downloaded Xamarin studio and I setup a hello world app using their walkthrough. It actually looks pretty intelligible to me. I imagine I'll have more trouble getting used to the IDE than to the language itself. If I can figure out code completion and quick fixes, I should be up and running pretty quickly. 
I've got StrongLoop installed now and I'm messing around with loopback. I think I have an idea of how this will work. I'll need a model for Movies, a model for Actors and some remote methods for connecting those two. I'm not sure how mongodb works, but I'm not certain I'll be able to work with it anyway. I don't have a server to install it on. From what I can tell, the process is pretty similar no matter which db I use. It looks like loopback automatically adds the tables (or I guess collections in the case of mongodb) to the database anyway. As far as I understand it, I'll need a third table linking the many-to-many connections of Actors and Movies. I don't know how this will work yet. 

#27 January 
I'm going to try and setup the backend with loopback today. This is the least familiar territory for me, so I'll try and knock it out early. I'm not worried about having to refactor a few times, that'll just help me learn it better. I don't anticipate much trouble hooking the app up to the backend once I have the webservice API's setup. I'm still not sure about hosting though.

##Sketch of Data
I'm going to make a first sketch of what I want the data to look like when I get it back from the server. 

###Movie

	{
		{
			"_id":0,
			"name":"The Big Lebowski",
			"description": "The room that fell apart when the rug went missing"
		}
	}

###Actor

	{
		{
			"_id":0,
			"name":"Dame Judi Dench",
			"birth":1-13-1943,
			"bio":"Judi was made a Dame in 1966, but she was a Dench far earlier"
		}
	}

###ActorMovie

	{
		{
			"actorId":0,
			"movieId":0
		}
	}

I have to have some method for adding an actor to the ActorMovie database, reading a movie from the ActorMovie database given an ActorId, and reading a actor from the ActorMovie database given a movieId. 

# 28 January
So I spent more time yesterday monkeying around with relations, and I think I've got it pretty much figured out. From the web I can add movies to actors and actors to movies. The loopback tool in cmd is pretty nifty. I added a little script to the boot directory to automatically generate some of both, I haven't yet gotten it to make the relationships though. The assignment calls for user sign in, so I'll spend some time today poking around with the user model to see if there's anything I want to use or change. 

I've spent some time looking over the Xamarin documentation and I think I'm understand a little bit how things should look. The overall structure of the project should probably look something like :

	Solution:
		|--Shared Class Library:
			|--Service Access Layer:
				|--ClassThatActuallyTalksToServer.cs
				|--ClassThatProvidesDummyData.cs (not sure how to host StrongLoop yet)
			|--Business Layer:
				|--DataManager.cs
				|--Models:
					|--Movie.cs
					|--Actor.cs
					|--User.cs
		|--Android:
			|--Activities:
				|--MainActivity.cs
				|--DetailActivity.cs
				|--LoginActivity.cs
			|--Adapters:
				|--MovieAdapter.cs
				|--ActorAdapter.cs
		|--iOS:
			|--AppLayer:
			|--UILayer:

# 31 January Backend
I've got the strongloop server up now on openshift. I can now start trying to build the app to hook up to a live server. I can even update it to use a mongodb setup (instead of just making up data at start). I'm having trouble figuring out how to make http requests in the shared library of Xamarin. It seems there are a number of ways to do it, but I can't see which way is best for my purposes. 

#1 February
So I think I've wrapped up a first draft of the Data/ServerAccess layers. I actually don't think I'm doing it rig (at least not yet). For now I'm using interfaces for callbacks. It seems that C# actually wants me to use delegate methods. I'll test around with it as it is and maybe refactor for delegates later. For now I'm going to try and get a list of the movies to appear in an Android ListView. From there I'll be able to tweak and rework as needed. 

Oh that sweet sweet taste of undeniable victory! I got the ListView populated with data from the web (after much struggle figuring out *exactly* how C# wants me to do async tasks. Turns out *you're not* supposed to use interfaces for this.) There's still much to do, but all of my concepts I think are proven. I'm going to relish this before I return to smashing my head against a wall. 

I've just spent some time making a movie detail activity just to make sure that it's getting all the data from the server; it is. I'll actually have to go back to strongloop to add some connections and maybe some more sample data. It may also be nice to fix the names of the properties (they're quite ugly at the moment.) There's still no error handling in the app. It wouldn't know what to do if the device didn't have internet access.  I also haven't begun to think about the sign in activity. 

#2 February
I've added the sample relationships to the boot script so I can test out the rest of my code. It works! I've got Actors and Movies all connected and it shows up nicely in Android with all the data it's supposed to have. I think I can declare the backend data modeling done. This leaves me with user signup/signin and the specific UI components of sliding listview items. 

I've got a sign up activity all good to go. Sign up and Log in are both working fine. It's *super* not secure, like the worst. I'm passing the password in plain text (for now). I don't know standard security practices with passing passwords over a webservice! I do know that one of the companies we work with actually does this in their released applications (though I feel like I shouldn't mention *which* company.) 

#3 February
I've added Delete and Post methods to the Xamarin project. I can now delete movies. I could also add them, but I don't have a GUI for it. It's not in the spec so it's not going to be a priority for now. I've also been tinkering with ways to do the slide to action. I know that in iOS it's pretty much baked into the UITableView, but it's not so simple for Android. I'll almost certainly have to use a RecyclerView instead of a ListView (that's better anyway). 

I've converted the main Movies ListView into a RecyclerView. I'm playing around with some ways to get the slide to action to work. I've made the layout a DrawerLayout. I think that's actually a pretty neato-misquito idea, the problem is that it doesn't really listen to dragging all that well. If you keep your finger on the cell it works, but usually your finger tends to leave the acceptable boarder and so the drawer doesn't open. 

I've spent some time tooling around with a port of Android's built in on slide listener. It's not great. There's no way to check which direction the thing was slid and it automatically adds drag to move (reorder the list).

#4 February
I've made the slide to action using a PageViewer. This is a pretty good solution, it was just a bit harder to implement than some of the others. There are a lot of callbacks in the PageViewerAdapter that the DrawerLayout would have taken care of on its own. Still, it works nicely and looks pretty good too. 

This completes the Android stuff. The app works and meets the spec. There's some code polish that would be nice, and maybe some UI polish too. But be'etzem the thing is ready to go. This leaves iOS. I don't have immediate access to a Mac, so I'm not sure how it will go. I also have much less experience working with iOS, so I expect a slightly harder time of it. Still, now that I have it all sorted out in Android, and the guts of it are all good to go, I think it shouldn't be too bad. Anyway it'll be a lot nicer working in C# instead of Objective-C. I really don't like Objective-C. 
