<template>
    <VaNavbar color="background-secondary" class="shadow-lg">
        <template #left>
            <VaNavbarItem>
                <VaButton preset="secondary" size="large" style="--va-button-lg-font-size: 1.68rem;"> MDEMITS </VaButton>
            </VaNavbarItem>
            <VaNavbarItem>
                <VaInput placeholder="Search" preset="solid" readonly @click="test">
                    <template #prependInner>
                        <VaIcon size="large" name="search" color="secondary" />
                    </template>
                </VaInput>
            </VaNavbarItem>
        </template>
        <template #right>
            <VaNavbarItem class="hidden md:block">
                <div class="flex items-center gap-8">
                    <div>Dashboard</div>
                    <div>Reports</div>
                    <div>Users</div>
                    <div>
                        <VaSwitch
                            v-model="value"
                            color="#5123a1"
                            off-color="#ffd300"
                            size="large"
                            style="
                                --va-switch-checker-background-color: #252723;
                            "
                        >
                            <template #innerLabel>
                                <div class="va-text-center">
                                    <VaIcon
                                        size="large"
                                        :name="
                                            value ? 'dark_mode' : 'light_mode'
                                        "
                                    />
                                </div>
                            </template>
                        </VaSwitch>
                    </div>
                </div>
            </VaNavbarItem>
        </template>
    </VaNavbar>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value = ref(false)

const test = () => {
    console.log('click')
}
</script>
