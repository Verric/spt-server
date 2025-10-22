import { ContextVariable } from "@spt/context/ContextVariable";
import { ContextVariableType } from "@spt/context/ContextVariableType";
import { LinkedList } from "@spt/utils/collections/lists/LinkedList";
import { injectable } from "tsyringe";

@injectable()
export class ApplicationContext {
    private variables = new Map<ContextVariableType, LinkedList<ContextVariable>>();
    private static holderMaxSize = 10;

    /**
     * Called like:
     * ```
     * const registerPlayerInfo = this.applicationContext.getLatestValue(ContextVariableType.REGISTER_PLAYER_REQUEST).getValue<IRegisterPlayerRequestData>();
     *
     * const activePlayerSessionId = this.applicationContext.getLatestValue(ContextVariableType.SESSION_ID).getValue<string>();
     *
     * const matchInfo = this.applicationContext.getLatestValue(ContextVariableType.RAID_CONFIGURATION).getValue<IGetRaidConfigurationRequestData>();
     * ```
     */
    public getLatestValue(type: ContextVariableType): ContextVariable | undefined {
        if (this.variables.has(type)) {
            return this.variables.get(type)?.getTail();
        }
        return undefined;
    }

    public getValues(type: ContextVariableType): ContextVariable[] | undefined {
        const variableType = this.variables.get(type);
        if (variableType) {
            const res: ContextVariable[] = [];
            for (const value of variableType.values()) {
                res.push(value);
            }

            return res;
        }
        return undefined;
    }

    public addValue(type: ContextVariableType, value: any): void {
        const list = this.variables.get(type) ?? new LinkedList<ContextVariable>();

        if (list.length >= ApplicationContext.holderMaxSize) {
            list.shift();
        }

        list.append(new ContextVariable(value, type));
        this.variables.set(type, list);
    }

    public clearValue(type: ContextVariableType): void {
        if (this.variables.has(type)) {
            this.variables.delete(type);
        }
    }
}
