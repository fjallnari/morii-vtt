export default interface GameTab {
    id: string,
    tooltip: string,
    color: string,
    icon: string,
    access: 'any' | 'owner' | 'player',
    component: unknown
}