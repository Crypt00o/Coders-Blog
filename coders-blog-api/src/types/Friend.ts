type FriendShip={
friend1_id:string,
friend2_id:string,
friendship_status?:boolean,
frinedship_date?:string
}
type FriendShipResult={
    friend?:string
    Error?:boolean
    Message:string
}
type Friend={
user_id?:string
}

export {FriendShip,FriendShipResult,Friend}