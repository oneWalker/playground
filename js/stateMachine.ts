// 引入xstate v5 examples
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

const stateMachine = XState.createMachine(
    {
        initial: CampaignStatus[CampaignStatus.DRAFT],
        on: {
            [CampaignEventType.INVALIDATE]: `.${CampaignStatus[CampaignStatus.SUSPENDED]}`,
        },
        states: {
            [CampaignStatus[CampaignStatus.DRAFT]]: {
                on: { [CampaignEventType.ACTIVATE]: CampaignStatus[CampaignStatus.ACTIVE] },
            },
            [CampaignStatus[CampaignStatus.PAUSED]]: {
                on: {
                    [CampaignEventType.ACTIVATE]: {
                        target: CampaignStatus[CampaignStatus.ACTIVE],
                        cond: 'hasEnoughCredits',
                    },
                },
                entry:['updateDraftStatus'],
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
    },
    {
        actions: {
            updateDraftStatus: (context: any, event: CampaignStateMachineEvent) => {
                context.status = CampaignStatus[CampaignStatus.DRAFT];
            }
        },    
        guards: {
            hasEnoughCredits: (context: any) => {
                return context.credits > 0;
            },
        },
    },
);
/**
 * 
 * @param status 当前的状态
 * @param event 触发事件
 * @param context 其他内容
 * @returns 
 */
const getNextStatus = (
    status: CampaignStatus,
    event: CampaignEventType,
    context: any,
): CampaignStatus => {
    const nextState = XState.getNextSnapshot(
        stateMachine,
        stateMachine.resolveState({ value: CampaignStatus[status] }),
        { type: event },
    );
    const nextStatus = CampaignStatus[nextState.value as keyof typeof CampaignStatus] ?? status;
    return nextStatus;
};

