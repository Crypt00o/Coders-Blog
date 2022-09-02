type Friend={
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

export {Friend,FriendShipResult}