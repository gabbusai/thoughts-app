<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Models\User;
use App\Models\Invite;

class InviteEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    use SerializesModels;
    public  User $sender;
    public  User $receiver;
    public string $message;
    /**
     * Create a new event instance.
     */
    public function __construct($sender, $receiver, $message)
    {
        $this->sender = $sender;
        $this->receiver= $receiver;
        $this->message = $message;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new Channel('user.'. $this->receiver->id),
        ];
    }
    public function broadcastAs()
    {
        return 'InviteEvent';
    }
    
}

/*

public function __construct($sender, $receiver)
    {
        $this->sender = $sender;
        $this->receiver= $receiver;
    }

    public function broadcastOn()
    {
        return new PrivateChannel('user.'. $this->receiver->id);
    }

    public function broadcastAs()
    {
        return 'InviteEvent';
    }

    */
