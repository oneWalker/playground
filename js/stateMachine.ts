import * as XState from 'xstate';

export enum CampaignEventType {
    ACTIVATE = 'ACTIVATE',
    DEACTIVATE = 'DEACTIVATE',
    NO_ENOUGH_CREDITS = 'NO_ENOUGH_CREDITS',
    ENOUGH_CREDITS = 'ENOUGH_CREDITS',
    INVALIDATE = 'INVALIDATE',
}
export enum CampaignStatus {
    DRAFT = 0,
    ACTIVE = 1,
    SUSPENDED = 2,
    PAUSED = 3,
    PENDING_ACTIVATION = 4, // 新增状态
}

type CampaignStateMachineEvent = { type: keyof typeof CampaignEventType };
type CampaignStateMachineStates = { value: keyof typeof CampaignStatus; context: any };
const stateMachine = XState.createMachine<
    any,
    CampaignStateMachineEvent,
    CampaignStateMachineStates
>({
    /** @xstate-layout N4IgpgJg5mDOIC5gF8A0IB2B7CdGgAoBbAQwGMALASwzAEp8QAHLWKgFyqw0YA9EAjACZ0AT0FDkU5EA */
    initial: CampaignStatus[CampaignStatus.DRAFT],
    on: {
        [CampaignEventType.INVALIDATE]: CampaignStatus[CampaignStatus.SUSPENDED],
    },
    states: {
        [CampaignStatus[CampaignStatus.DRAFT]]: {
            on: { [CampaignEventType.ACTIVATE]: CampaignStatus[CampaignStatus.ACTIVE] },
        },
        [CampaignStatus[CampaignStatus.PAUSED]]: {
            on: { [CampaignEventType.ACTIVATE]: CampaignStatus[CampaignStatus.ACTIVE] },
        },
        [CampaignStatus[CampaignStatus.ACTIVE]]: {
            on: {
                [CampaignEventType.NO_ENOUGH_CREDITS]: CampaignStatus[CampaignStatus.SUSPENDED],
                [CampaignEventType.DEACTIVATE]: CampaignStatus[CampaignStatus.PAUSED],
            },
        },
        [CampaignStatus[CampaignStatus.SUSPENDED]]: {
            on: {
                [CampaignEventType.ENOUGH_CREDITS]: CampaignStatus[CampaignStatus.ACTIVE],
                [CampaignEventType.DEACTIVATE]: CampaignStatus[CampaignStatus.PAUSED],
            },
        },
    },
    predictableActionArguments: true,
});
