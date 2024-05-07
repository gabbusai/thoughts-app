<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Thought;
use App\Models\Category;
use App\Models\Comment;
use App\Models\Like;
use App\Models\Invite;
use App\Events\MessageNotification;
use App\Events\InviteEvent;
use Illuminate\Support\Facades;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ThoughtController extends Controller
{
    //
    public function index()
    {
        $currentUser = Auth::user();
        
        //$selectedUser = session()->get('selected_user');
        /*$thoughts = Thought::with(['user' => function ($query) {
            $query->with('thoughts')->orderBy('created_at', 'desc');},
            'categories', 'likes', 'comments'])
            ->orderBy('created_at', 'desc') // Optional: Sort by latest first
            ->get(); // Eager load all records, no pagination for testing
*/

            $thoughts = Thought::with([
                'user' => function ($query) {
                    $query->with('thoughts')->orderBy('created_at', 'desc');
                    $query->withCount([
                        'invitationsSent as invitations_sent_count' => function ($query) {
                            $query->where('accepted', 'accepted');
                        },
                        'invitationsReceived as invitations_received_count' => function ($query) {
                            $query->where('accepted', 'accepted');
                        },
                    ]);
                },
                'categories',
                'likes',
                'comments',
            ])
            ->orderBy('created_at', 'desc')
            ->get(); // Eager load all records, no pagination for testing

        return Inertia::render('Main/Index', [
            'currentUser' => $currentUser,
            'thoughts' => $thoughts,
            //'selectedUser' => $selectedUser
        ]);
    }

    public function viewUser($user)
    {
        $currentUser = Auth::user();
        
        $user = User::with([
            'invitationsReceived',
            'thoughts',
        ])->findOrFail($user);
        
        $userId = $user->id;
        $thoughts = Thought::whereHas('categories', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })
        ->with(['user' => function ($query) {
            $query->with('thoughts')->orderBy('created_at', 'desc');
        }, 'categories', 'likes', 'comments'])
        ->orderBy('created_at', 'desc') // Optional: Sort by latest first
        ->get(); // Eager load all records, no pagination for testing

        return Inertia::render('Main/ViewUser', [
            'currentUser' => $currentUser,
            'user' => $user,
            'thoughts' => $thoughts,
            //'selectedUser' => $selectedUser
        ]);
    }

    public function sortByCategory($category)
    {
        $currentUser = Auth::user();
        $category = Category::where('category', $category)->firstOrFail();
        $categoryId = $category->id;

        $thoughts = Thought::whereHas('categories', function ($query) use ($categoryId) {
            $query->where('category_id', $categoryId);
        })
        ->with(['user' => function ($query) {
            $query->with('thoughts')->orderBy('created_at', 'desc');
            $query->withCount([
                'invitationsSent as invitations_sent_count' => function ($query) {
                    $query->where('accepted', 'accepted');
                },
                'invitationsReceived as invitations_received_count' => function ($query) {
                    $query->where('accepted', 'accepted');
                },
            ]);
        }, 'categories', 'likes', 'comments'])
        ->orderBy('created_at', 'desc') // Optional: Sort by latest first
        ->get(); // Eager load all records, no pagination for testing

        $searchString = $category->category;

        return Inertia::render('Main/SearchIndex', [
            'currentUser' => $currentUser,
            'thoughts' => $thoughts,
            'searchString' => $searchString,
            //'selectedUser' => $selectedUser
        ]);
    }


    public function searchThought(Request $request)
    {
        $validatedData = $request->validate([
            'search' => 'required'
        ]);
        $searchString = $validatedData['search'];
        $currentUser = Auth::user();

        $thoughts = Thought::where('title', 'like', '%' . $searchString . '%')
        ->with(['user' => function ($query) {
            $query->with('thoughts')->orderBy('created_at', 'desc');
            $query->withCount([
                'invitationsSent as invitations_sent_count' => function ($query) {
                    $query->where('accepted', 'accepted');
                },
                'invitationsReceived as invitations_received_count' => function ($query) {
                    $query->where('accepted', 'accepted');
                },
            ]);
        }, 'categories', 'likes', 'comments'])
        ->orderBy('created_at', 'desc') // Optional: Sort by latest first
        ->get(); // Eager load all records, no pagination for testing

        return Inertia::render('Main/SearchIndex', [
            'currentUser' => $currentUser,
            'thoughts' => $thoughts,
            'searchString' => $searchString
        ]);

    }



    

    public function viewThought($id)
    {
        $currentUser = Auth::user();
        $thought = Thought::with(['user', 'categories', 'likes', 
        'comments'=> function ($query) {
            $query->with('user')->orderBy('created_at', 'desc');},
        ])
            ->orderBy('created_at', 'desc') // Optional: Sort by latest first
            ->findOrFail($id);
        //
        $hasLiked = $thought->likes->contains('user_id', $currentUser->id);
        return Inertia::render('Main/ViewThought', [
            'currentUser' => $currentUser,
            'thought' => $thought,
            'hasLiked' => $hasLiked,
        ]);
    }

    public function createThought()
    {
        $categories = Category::all();
        if($categories->empty()){
            $defaultCategories = [
                'random' => 'Random',
                'comedy' => 'Comedy',
                'sad' => 'Sad',
                'entertainment' => 'Entertainment',
                'politics' => 'Politics',
                'health' => 'Health',
                'music' => 'Music',
                'arts' => 'Arts',
                'sports' => 'Sports',
                'science' => 'Science',
                'tech' => 'Tech',
                'business' => 'Business',
            ];

            foreach($defaultCategories as $key => $category){
                Category::create([
                    'category' => $category,
                ]);
            }
        }
        $currentUser = Auth::user();
        //$selectedUser = session()->get('selected_user');
        return Inertia::render('Main/CreateThought', [
            'currentUser' => $currentUser,
            'categories' => $categories,
            //'selectedUser' => $selectedUser,
        ]);
    }

    public function storeThought(Request $request)
    {
        $currentUser = Auth::user();
        $validatedData = $request->validate([
            'title' => 'required',
            'content' => 'required',
            'categories' => 'array',
        ]);

        $thought = Thought::create([
            'title' => $validatedData['title'],
            'content' => $validatedData['content'],
            'user_id' => $currentUser->id,
        ]);

        $thought->categories()->attach($validatedData['categories']);
        return redirect()->route('thoughts.home')->with('success', 'Thought created successfully!');
    }

    //edit stuff
    public function editThought($id){
        $currentUser = Auth::user();
        $categories = Category::all();
        $thought = Thought::with(['user', 'categories', 'likes', 
        'comments'=> function ($query) {
            $query->with('user')->orderBy('created_at', 'desc');},
        ])
            ->orderBy('created_at', 'desc') // Optional: Sort by latest first
            ->findOrFail($id);
            if ($currentUser->id !== $thought->user_id) {
                return redirect()->route('thought.viewThought', ['id' => $thought->id]);
            }else{
        return Inertia::render('Main/EditThought', [
                'currentUser' => $currentUser,
                'thought' => $thought,
                'categories' => $categories
                //'selectedUser' => $selectedUser,
            ]);
        }
    }

    public function saveChanges(Request $request, $thoughtId)
    {
        $currentUser = Auth::user();
        $validatedData = $request->validate([
            'title' => 'required',
            'content' => 'required',
            'categories' => 'array',
        ]);
    
        $thought = Thought::findOrFail($thoughtId); // Find the thought by ID
    
        // Update thought attributes
        $thought->title = $validatedData['title'];
        $thought->content = $validatedData['content'];
        $thought->save(); // Save changes to the existing thought
    
        // Update associated categories
        $thought->categories()->detach(); // Detach all existing categories
        $thought->categories()->attach($validatedData['categories']); // Attach new categories
    
        return redirect()->route('thoughts.home')->with('success', 'Thought updated successfully!');
    }

    public function deleteThought($thoughtId){
        $currentUser = Auth::user();
        $thought = Thought::findOrFail($thoughtId);
        if($currentUser->id !== $thought->user_id){
            return redirect()->route('thoughts.home');
        }else{
        $thought->delete();
        return redirect()->route('thoughts.home')->with('success', 'Thought deleted successfully!');
        }

    }




    public function likeThought($id)
    {
        $thought = Thought::findOrFail($id);
        $user = Auth::user();
        if (!$thought->likers()->where('user_id', $user->id)->exists()) {
            // Create a new like for the thought
            $like = new Like();
            $like->user_id = $user->id;
            $thought->likes()->save($like);
        }
        return redirect()->back();
    }

    public function unlikeThought(Thought $thought){
        $user = Auth::user();
            // Find the like record for the current user and the post
            $like = Like::where('user_id', $user->id)
                        ->where('thought_id', $thought->id)
                        ->first();

            if ($like) {
                // If the like record exists, delete it
                $like->delete();
            }

            // Redirect back or return a response
            return redirect()->back()->with('success', 'Post unliked successfully.');
    }

    public function commentOnThought($thought, Request $request){
        $validatedData = $request->validate([
            'content' => 'required'
        ]);
        $thought = Thought::findOrFail($thought);
        $user = Auth::user();

        $comment = new Comment();
        $comment->user_id = $user->id;
        $comment->thought_id = $thought->id;
        $comment->content = $validatedData['content']; 
        $comment->save();
        return redirect()->back()->with('success', 'comment has been added');
    }

    /*test stuff
    public function sendEvent()
    {
        //$message = $request->input('message');
        $user = Auth::user();
        $message = 'INVITE';
        $event = event(new MessageNotification($message, $user));
        return response()->json(['success' => true, 'message' => $event]);
    }

    */


    //real stuff
    public function sendInviteEvent($receiver)
    {
        //$message = $request->input('message');
        $sender = Auth::user();
        //$sender = User::findOrFail(1);
        $receiver = User::findOrFail($receiver);

        $existingInvite = Invite::where('inviter_id', $sender->id)
                        ->where('receiver_id', $receiver->id)
                        ->first();
        //cannot send to your own profile
        if($sender->id == $receiver->id){
            return back();
        }
        else if($existingInvite){
            return back();
        }
        else{
            //session()->put('selected_user', $receiver);
            $newInvite = new Invite;
            $newInvite->inviter_id = $sender->id;
            $newInvite->receiver_id = $receiver->id;
            $newInvite->accepted = 'pending'; // Set default status as 'pending'
            // Save the Invite to the database
            $newInvite->save();
            $message = $sender->name . ' has sent you an invite';
            event(new InviteEvent(Auth::user(), $receiver, $message)); 
            return back();
        }
    }

    //view notification
    public function viewNotifications() {
        $currentUser = Auth::user();
        $user = User::findOrFail($currentUser->id);
        $invites = $user->invitationsReceived()->with('inviter')->get();
        $invitesSent = $user->invitationsSent()->with('receiver')->get();
        return Inertia::render('Main/ViewNotifications', [
            'currentUser' => $user,
            'invites' => $invites,
            'invitesSent' => $invitesSent
        ]);
    }

    public function acceptInvite($invite){
    $invite = Invite::findOrFail($invite);
    $inviterId = $invite->inviter_id; //the one who sent the invite will receive the message
    $inviter = User::findOrFail($inviterId);

    $receiverId = $invite->receiver_id;
    $receiver = User::findOrFail($receiverId);

    $invite->accepted = 'accepted';
    $invite->save();

    $message = $receiver->name . ' has accepted your invite';
    event(new InviteEvent($receiver, $inviter, $message)); 

    return redirect()->route('thoughts.notification')->with('success', 'WORK');
    }

    public function rejectInvite($invite){
        $currentUser = Auth::user();
        $invite = Invite::findOrFail($invite);
        $inviterId = $invite->inviter_id; //the one who sent the invite will receive the message
        $inviter = User::findOrFail($inviterId);
    
        $receiverId = $invite->receiver_id;
        $receiver = User::findOrFail($receiverId);

        if($currentUser ==  $inviter) {
            $message = ' You unsent your invite';
        }else{
            $message = $receiver->name . ' Has denied your invite';
        }

        
        //$invite->accepted = 'rejected';
        //$invite->save();
        $invite->delete();
        event(new InviteEvent($receiver, $inviter, $message)); 
        return redirect()->route('thoughts.notification')->with('success', 'WORK');
    }
}
